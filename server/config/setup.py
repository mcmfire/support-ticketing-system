import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

class AppSettings:
    DEBUG = os.environ.get('DEBUG')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    MONGO_URI = os.environ.get('MONGO_URI')