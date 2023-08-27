from flask import jsonify
from models.user import User

class AuthService:
    @staticmethod
    def get_user(identity):
        user = User.get_by_identity(identity)

        if not user:
            return jsonify({"message": "User not found."}), 401

        return jsonify({"username": user['username']}), 200

    @staticmethod
    def authenticate_user(username, password):
        response = User.authenticate(username, password)

        return response

    @staticmethod
    def save_user(email, username, password, first_name, last_name):
        user = User(email, username, password, first_name, last_name)
        response = user.save()

        return response
    
    @staticmethod
    def revoke_user(refresh_token):
        response = User.revoke(refresh_token)

        return response