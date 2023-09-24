from flask import jsonify, session
from flask_jwt_extended import verify_jwt_in_request, jwt_required, get_jwt
from models.user import User
from utils.variables import Response
from utils.extensions import pymongo, cache
from utils.cleanup import user_data_cleanup
from utils.token import generate_token, revoke_token
from utils.db import get_user_data
from utils.firebase import create_avatar
from utils.user_input import check_hash_input

class AuthService:
    @staticmethod
    def get_by_identity(identity):        
        cache_key = f'user_cache={identity}'
        user_cache = cache.get(cache_key)
        
        user = get_user_data(
                'auth',
                'profiles',
                {
                    "$or": [
                        {"username": identity},
                        {"email": identity}
                    ]
                }, {})
        
        if not user:
            return jsonify({"message": "User not found."}), 401

        current_user = session.get('user')

        if not current_user or current_user['username'] != user['username']:
            user['_id'] = str(user['_id'])
            session['user'] = user
        
        if user_cache:
            return user_cache

        response = jsonify({"username": user['username']}), 200

        cache.set(cache_key, response)
        
        return response

    @staticmethod
    @jwt_required(optional=True, verify_type=False)
    def authenticate_user(password):
        current_user = session.get('user')
        token = get_jwt()

        if current_user:
            user = get_user_data('auth', 'credentials', {"username":current_user['username']}, {})

            if user:
                if not check_hash_input(user['password'], password):
                    return jsonify({"message": "Invalid password."}), 401

                if not token:
                    new_token = generate_token(user['username'])

                    return jsonify({
                        "message": "Login successful.",
                        "token": new_token
                    }), 200
                
                valid = verify_jwt_in_request(optional=True, verify_type=False)

                if valid:
                    return jsonify({"message": "Action approved."})
        
        return Response().undefined

    @staticmethod
    def save_user(email, username, password, first_name, last_name):
        keys = [{"username": username}]
        
        if email:
            keys.append({"email": email})

        user = get_user_data(
            'auth',
            'profiles',
            {
                "$or": keys
            }
        )
        new_user = User(email, username, password, first_name, last_name)

        if not user:
            credentials = {
                "username": new_user.username,
                "password": new_user.password,
            }
            profiles = {
                "username": new_user.username,
                "first_name": new_user.first_name,
                "last_name": new_user.last_name,
                "department": new_user.department,
                "position": new_user.position,
            }
            
            if email:
                credentials['email'] = new_user.email
                profiles['email'] = new_user.email

            pymongo.cx['auth']['credentials'].insert_one(credentials)
            pymongo.cx['auth']['profiles'].insert_one(profiles)

            new_user = get_user_data('auth', 'profiles', {"username": new_user.username})
            create_avatar(new_user['_id'])

            return jsonify({"message": "User has been saved."}), 200
        
        if user['username'] == username and user['email'] == email:
            return jsonify({"message": "Username and Email already exists!"}), 409
        elif user['username'] == username:
            return jsonify({"message": "Username already exists!"}), 409
        elif user['email'] == email:
            return jsonify({"message": "Email already exists!"}), 409
        
        return Response().undefined
    
    @staticmethod
    @jwt_required(optional=True, verify_type=False)
    def revoke_user(refresh_token):
        access_token = get_jwt()

        if not access_token:
            return jsonify({"message": "User already logged out."}), 409
        
        revoked_access = revoke_token(access_token)
        revoked_refresh = revoke_token(refresh_token)
        
        if not (revoked_access or revoked_refresh):
            return Response().undefined
        elif revoked_access:
            revoked = revoked_access
        elif revoked_refresh:
            revoked = revoked_refresh

        cache_key = f'user_cache={revoked["sub"]}'
        user_data_cleanup(cache_key)

        return jsonify({"message": "Logout successful."}), 200