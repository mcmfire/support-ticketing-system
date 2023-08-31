import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

class AppSettings:
    DEBUG = os.environ.get('DEBUG') if os.environ.get('DEBUG') else True
    SECRET_KEY = os.environ.get('SECRET_KEY')
    MONGO_URI = os.environ.get('MONGO_URI')
    CACHE_TYPE = os.environ.get('CACHE_TYPE') if os.environ.get('CACHE_TYPE') else 'SimpleCache'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = os.environ.get('JWT_TOKEN_LOCATION') if os.environ.get('JWT_TOKEN_LOCATION') else 'headers'
    JWT_HEADER_NAME = os.environ.get('JWT_HEADER_NAME') if os.environ.get('JWT_HEADER_NAME') else 'Authorization'
    JWT_HEADER_TYPE = os.environ.get('JWT_HEADER_TYPE') if os.environ.get('JWT_HEADER_TYPE') else 'Bearer'
    JWT_ACCESS_TOKEN_EXPIRES = os.environ.get('JWT_ACCESS_TOKEN_EXPIRES') if os.environ.get('JWT_ACCESS_TOKEN_EXPIRES') else 1800
    JWT_REFRESH_TOKEN_EXPIRES = os.environ.get('JWT_REFRESH_TOKEN_EXPIRES') if os.environ.get('JWT_REFRESH_TOKEN_EXPIRES') else 259200