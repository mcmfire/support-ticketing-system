from flask import request

def filter_input(**kwargs):
    data = {}

    for key, value in kwargs.items():
        if request.endpoint == "auth_bp.register_user":
            required = ("email", "username", "password", "first_name", "last_name")
        
        if key in required:
            data[key] = value

    return data