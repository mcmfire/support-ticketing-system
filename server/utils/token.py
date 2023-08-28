import os
from flask_jwt_extended import create_access_token, create_refresh_token
from flask_jwt_extended import decode_token
from flask_jwt_extended.exceptions import JWTDecodeError
from datetime import datetime, timedelta

def generate_token(identity):
    access_token = create_access_token(identity, expires_delta=timedelta(seconds=int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES'))))
    refresh_token = create_refresh_token(identity, expires_delta=timedelta(seconds=int(os.environ.get('JWT_REFRESH_TOKEN_EXPIRES'))))

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