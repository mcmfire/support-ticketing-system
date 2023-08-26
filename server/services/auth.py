from flask import jsonify
from models.user import User

class AuthService:
    @classmethod
    def get_user(cls, identity):
        user = User.get_by_identity(identity)

        if not user:
            return jsonify({"message": "User not found."}), 401

        return jsonify({"username": user['username']}), 200

    @classmethod
    def authenticate_user(cls, username, password):
        response = User.authenticate(username, password)

        return response

    @classmethod
    def save_user(cls, email, username, password, first_name, last_name):
        user = User(email, username, password, first_name, last_name)
        response = user.save()

        return response