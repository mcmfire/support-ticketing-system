from flask_jwt_extended import create_access_token, create_refresh_token, decode_token
from utils.extensions import pymongo
from utils.db import get_user_data

def generate_token(identity):
    access_token = create_access_token(identity)
    refresh_token = create_refresh_token(identity)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }

def revoke_token(token):
    if 'jti' not in token:
        token = decode_token(token)

    current_token = {
            "jti": token['jti'],
            "exp": token['exp'],
    }

    collection = "revoked_" + token['type']
    
    revoked_token = get_user_data('token', collection, current_token, {"_id": 0})

    if not revoked_token:
        pymongo.cx['token'][collection].insert_one(current_token)

        return token