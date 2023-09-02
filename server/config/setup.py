import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

class AppSettings:
    DEBUG = os.environ.get('DEBUG') if os.environ.get('DEBUG') else True
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SOCKETIO_ASYNC_MODE = os.environ.get('SOCKETIO_ASYNC_MODE') if os.environ.get('SOCKETIO_ASYNC_MODE') else 'eventlet'
    SOCKETIO_TRANSPORTS = os.environ.get('SOCKETIO_TRANSPORTS') if os.environ.get('SOCKETIO_TRANSPORTS') else ['websocket', 'polling']
    MONGO_URI = os.environ.get('MONGO_URI')
    MONGO_CONNECT = os.environ.get('MONGO_CONNECT') if os.environ.get('MONGO_CONNECT') else False
    MONGO_MAX_POOL_SIZE = os.environ.get('MONGO_MAX_POOL_SIZE') if os.environ.get('MONGO_MAX_POOL_SIZE') else 10
    CACHE_TYPE = os.environ.get('CACHE_TYPE') if os.environ.get('CACHE_TYPE') else 'SimpleCache'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = os.environ.get('JWT_TOKEN_LOCATION') if os.environ.get('JWT_TOKEN_LOCATION') else 'headers'
    JWT_HEADER_NAME = os.environ.get('JWT_HEADER_NAME') if os.environ.get('JWT_HEADER_NAME') else 'Authorization'
    JWT_HEADER_TYPE = os.environ.get('JWT_HEADER_TYPE') if os.environ.get('JWT_HEADER_TYPE') else 'Bearer'
    JWT_ACCESS_TOKEN_EXPIRES = os.environ.get('JWT_ACCESS_TOKEN_EXPIRES') if os.environ.get('JWT_ACCESS_TOKEN_EXPIRES') else 1800
    JWT_REFRESH_TOKEN_EXPIRES = os.environ.get('JWT_REFRESH_TOKEN_EXPIRES') if os.environ.get('JWT_REFRESH_TOKEN_EXPIRES') else 259200