from flask import request
from utils.extensions import bcrypt

route_require = {
    "auth_bp.find_user": ('identity', ),
    "auth_bp.login_user": ('password', ),
    "auth_bp.register_user": ('email', 'username', 'password', 'first_name', 'last_name'),
    "auth_bp.logout_user": ('refresh_token', ),
    "panel_bp.create_task": ('contact', 'title', 'description'),
    "panel_bp.update_task": ('department', 'position', 'contact', 'title', 'description', 'upvotes', 'is_responded'),
}

def hash_input(data):
    hashed_data = bcrypt.generate_password_hash(data).decode('utf-8')

    return hashed_data

def check_hash_input(secured_data, input_data):
    valid = bcrypt.check_password_hash(secured_data, input_data)

    return valid

def filter_input(**kwargs):
    action = request.endpoint
    data = {}

    for key in route_require[action]:
        if key not in kwargs:
            continue
        elif not kwargs[key]:
            data[key] = ''
        elif key == 'password' and action != 'auth_bp.login_user':
            data[key] = hash_input(kwargs[key])
        else:
            data[key] = kwargs[key]

    return data