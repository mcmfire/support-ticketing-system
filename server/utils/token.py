from flask_jwt_extended import create_access_token, create_refresh_token
from flask_jwt_extended import decode_token, get_jwt
from flask_jwt_extended.exceptions import JWTDecodeError
from datetime import datetime

def generate_token(identity):
    access_token = create_access_token(identity)
    refresh_token = create_refresh_token(identity)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }

def process_token(token):
    try:
        decoded_token = decode_token(token)
        decoded_token_expiry = datetime.utcfromtimestamp(decoded_token['exp'])
        time_now = datetime.utcnow()
        if decoded_token_expiry < time_now:
            return False
    except JWTDecodeError:
        return False

    return decoded_token