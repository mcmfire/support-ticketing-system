import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

class AppSettings:
    DEBUG = os.environ.get('DEBUG')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    MONGO_URI = os.environ.get('MONGO_URI')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = os.environ.get('JWT_TOKEN_LOCATION')
    JWT_HEADER_NAME = os.environ.get('JWT_HEADER_NAME')
    JWT_HEADER_TYPE = os.environ.get('JWT_HEADER_TYPE')
    JWT_ACCESS_TOKEN_EXPIRES = os.environ.get('JWT_ACCESS_TOKEN_EXPIRES')
    JWT_REFRESH_TOKEN_EXPIRES = os.environ.get('JWT_REFRESH_TOKEN_EXPIRES')