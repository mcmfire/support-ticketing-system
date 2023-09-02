from flask import jsonify, session
from flask_jwt_extended import get_jwt, verify_jwt_in_request
from models.user import User
from utils.extensions import pymongo, cache
from utils.cleanup import user_data_cleanup
from utils.token import generate_token
from utils.db import get_user_auth
from utils.user_input import check_hash_input

class AuthService:
    @staticmethod
    def get_by_identity(identity):        
        cache_key = f'user_cache={identity}'
        user_cache = cache.get(cache_key)
        
        if user_cache:
            return user_cache
        
        user = get_user_auth(
                'profiles',
                {
                    "$or": [
                        {"username": identity},
                        {"email": identity}
                    ]
                }, {'_id': 0})

        if not user:
            return jsonify({"message": "User not found."}), 401

        response = jsonify({"username": user['username']}), 200

        cache.set(cache_key, response)
        current_user = session.get('user')
        
        if not current_user or current_user['username'] != user['username']:
            session['user'] = user

        return response

    @staticmethod
    def authenticate_user(password):
        current_user = session.get('user')

        if current_user:
            user = get_user_auth('credentials', {"username":current_user['username']}, {})

            if user:
                if not check_hash_input(user['password'], password):
                    return jsonify({"message": "Invalid password."}), 401
                
                valid = verify_jwt_in_request(optional=True, verify_type=False)

                if not valid:
                    token = generate_token(user['username'])

                    return jsonify({
                        "message": "Login successful.",
                        "token": token
                    }), 200
                
                return jsonify({"message": "Action approved."})
        
        return jsonify({"message": "Something went wrong."}), 500

    @staticmethod
    def save_user(email, username, password, first_name, last_name):
        user = get_user_auth(
            'profiles',
            {
                "$or": [
                    {"username": username},
                    {"email": email}
                ]
            }
        )
        new_user = User(email, username, password, first_name, last_name)

        if not user:
            credentials = {
                "email": new_user.email,
                "username": new_user.username,
                "password": new_user.password,
            }
            profiles = {
                "email": new_user.email,
                "username": new_user.username,
                "first_name": new_user.first_name,
                "last_name": new_user.last_name
            }

            pymongo.cx['auth']['credentials'].insert_one(credentials)
            pymongo.cx['auth']['profiles'].insert_one(profiles)

            return jsonify({"message": "User has been saved."}), 200
        
        if user['username'] == username and user['email'] == email:
            return jsonify({"message": "Username and Email already exists!"}), 409
        elif user['username'] == username:
            return jsonify({"message": "Username already exists!"}), 409
        elif user['email'] == email:
            return jsonify({"message": "Email already exists!"}), 409
        
        return jsonify({"message": "Something went wrong."}), 500
    
    @staticmethod
    def revoke_user(refresh_token):
        current_token = {
            "jti": get_jwt()['jti'],
            "exp": get_jwt()['exp'],
            "refresh_token": refresh_token
        }

        token = get_user_auth('tokens', current_token, {"_id": 0})

        if not token:
            cache_key = f'user_cache={get_jwt()["sub"]}'
            user_data_cleanup(cache_key)
            pymongo.cx['auth']['tokens'].insert_one(current_token)

            return jsonify({"message": "Logout successful."}), 200
        
        return jsonify({"message": "User already logged out."}), 409