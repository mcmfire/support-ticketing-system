from flask import request
from utils.extensions import bcrypt

def hash_input(data):
    hashed_data = bcrypt.generate_password_hash(data).decode('utf-8')

    return hashed_data

def filter_input(**kwargs):
    data = {}

    for key, value in kwargs.items():
        if request.endpoint == "auth_bp.register_user":
            required = ("email", "username", "password", "first_name", "last_name")
        
        if key in required:
            data[key] = value if key != "password" else hash_input(value)

    return data