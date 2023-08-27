import os
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta

def generate_token(identity):
    access_token = create_access_token(identity, expires_delta=timedelta(seconds=int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES'))))
    refresh_token = create_refresh_token(identity, expires_delta=timedelta(seconds=int(os.environ.get('JWT_REFRESH_TOKEN_EXPIRES'))))

    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }