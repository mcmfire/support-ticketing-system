from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request

excluded_endpoints = ('auth_bp.find_user', 'auth_bp.login_user', 'auth_bp.register_user', None)

def verify_token():
    if request.endpoint not in excluded_endpoints:
        valid = verify_jwt_in_request(optional=True, verify_type=False)
 
        if not valid:
            return jsonify({"message": "Token is not valid."}), 401
    elif request.endpoint == None:
        return jsonify({"message": "Page not found."}), 404