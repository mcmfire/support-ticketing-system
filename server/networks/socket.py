import os
from flask_jwt_extended import get_jwt
from utils.token import generate_token, process_token
from utils.extensions import socketio
from datetime import datetime, timezone, timedelta

@socketio.on('connect')
def client_connect():
    socketio.send('Client connected successfully.')

@socketio.on('request_token_refresh')
def regenerate_token(data):
    current_token = data.get('current_token')
    token = process_token(current_token)

    if token and token['type'] == 'refresh':
        new_token = generate_token(get_jwt()['sub'])

        socketio.emit('token_refresh_response', {
            "message": "Token refreshed.",
            "token": {
                "access_token": new_token["access_token"],
                "refresh_token": new_token["refresh_token"]
            }
        })