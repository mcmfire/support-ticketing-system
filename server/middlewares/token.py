from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, jwt_required, get_jwt
from utils.token import generate_token

excluded_endpoints = ('auth_bp.find_user', 'auth_bp.register_user', 'serve_routes', None)

@jwt_required(optional=True, verify_type=False)
def verify_token():
    token = get_jwt()

    if not token:
        return
    elif request.endpoint not in excluded_endpoints:
        if token['type'] == 'access':
            valid = verify_jwt_in_request(optional=True, verify_type=True, refresh=False)

            if not valid:
                return jsonify({"message": "Refresh required."}), 401
        
        elif token['type'] == 'refresh':
            valid = verify_jwt_in_request(optional=True, verify_type=True, refresh=True)

            if not valid:
                return jsonify({"message": "Login required."}), 401
            
            new_token = generate_token(token['sub'])
            
            return jsonify({
                    "message": "Token refreshed.",
                    "token": new_token
                })
    elif request.endpoint == None:
        return jsonify({"message": "Page not found."}), 404