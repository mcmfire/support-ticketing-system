from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from utils.token import generate_token

exclude_checking = ('auth_bp.find_user', 'auth_bp.login_user', 'auth_bp.register_user')

def verify_token():
    if request.endpoint not in exclude_checking:
        valid = verify_jwt_in_request(optional=True, verify_type=False)
 
        if not valid:
            return jsonify({"message": "Token is not valid."}), 401
        
def regenerate_token():
    valid = verify_jwt_in_request(optional=True, refresh=True, verify_type=True)
    
    if valid:
        token = generate_token(get_jwt()['sub'])

        return jsonify({
            "message": "Token refreshed.",
            "token": {
                "access_token": token["access_token"],
                "refresh_token": token["refresh_token"]
            }
        })