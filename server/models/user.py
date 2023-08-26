from flask import jsonify
from utils.extensions import pymongo

class User:
    def __init__(self, email, username, password, first_name, last_name):
        self.email = email
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
    
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
        
        if user["username"] == self.username or user["email"] == self.email:
            return jsonify({"message": "Username or Email already exists!"}), 409
        
        return jsonify({"message": "Something went wrong."}), 500