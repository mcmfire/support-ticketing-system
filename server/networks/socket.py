from flask_jwt_extended import verify_jwt_in_request, get_jwt
from utils.token import generate_token
from utils.extensions import socketio

@socketio.on('request_token_refresh')
def regenerate_token():
    valid = verify_jwt_in_request(optional=True, refresh=True, verify_type=True)
    
    if valid:
        token = generate_token(get_jwt()['sub'])

        socketio.emit('token_refresh_response', {
            "message": "Token refreshed.",
            "token": {
                "access_token": token["access_token"],
                "refresh_token": token["refresh_token"]
            }
        })