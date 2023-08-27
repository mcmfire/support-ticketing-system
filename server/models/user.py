from flask import jsonify
from flask_jwt_extended import get_jwt
from utils.extensions import pymongo
from utils.user_input import check_hash_input
from utils.token import generate_token

class User:
    def __init__(self, email, username, password, first_name, last_name):
        self.email = email
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
    
    @staticmethod
    def get_by_identity(identity):
        user = pymongo.cx['auth']['credentials'].find_one(
            {
                "$or": [
                    {"username": identity},
                    {"email": identity}
                ]
            }
        )

        if not user:
            return False
        
        return user
    
    @classmethod
    def authenticate(cls, username, password):
        user = cls.get_by_identity(username)

        if user:
            if not check_hash_input(user['password'], password):
                return jsonify({"message": "Invalid password."}), 401
            
            token = generate_token(username)

            return jsonify({
                "message": "Login successful.",
                "token": token
            }), 200
        
        return jsonify({"message": "Something went wrong."}), 500

    def save(self):
        user = pymongo.cx['auth']['credentials'].find_one(
            {
                "$or": [
                    {"username": self.username},
                    {"email": self.email}
                ]
            },
            {"_id": 0}
        )
        
        if not user:
            credentials = {
                "email": self.email,
                "username": self.username,
                "password": self.password,
            }
            profiles = {
                "email": self.email,
                "username": self.username,
                "first_name": self.first_name,
                "last_name": self.last_name
            }

            pymongo.cx['auth']['credentials'].insert_one(credentials)
            pymongo.cx['auth']['profiles'].insert_one(profiles)

            return jsonify({"message": "User has been saved."}), 200
        
        if user['username'] == self.username and user['email'] == self.email:
            return jsonify({"message": "Username and Email already exists!"}), 409
        elif user['username'] == self.username:
            return jsonify({"message": "Username already exists!"}), 409
        elif user['email'] == self.email:
            return jsonify({"message": "Email already exists!"}), 409
        
        return jsonify({"message": "Something went wrong."}), 500
    
    @classmethod
    def revoke(cls):
        current_token = {
            "jti": get_jwt()['jti'],
            "exp": get_jwt()['exp']
        }

        token = pymongo.cx['auth']['tokens'].find_one(current_token, {"_id": 0})

        if not token:
            pymongo.cx['auth']['tokens'].insert_one(current_token)

            return jsonify({"message": "Logout successful."}), 200
        
        return jsonify({"message": "User already logged out."}), 409
        

        