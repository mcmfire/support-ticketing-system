from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request

exclude_checking = ('auth_bp.find_user', 'auth_bp.login_user', 'auth_bp.register_user')

def verify_token():
    if request.endpoint not in exclude_checking:
        valid = verify_jwt_in_request(optional=True)

        if not valid:
            return jsonify({"message": "Token is not valid."}), 401