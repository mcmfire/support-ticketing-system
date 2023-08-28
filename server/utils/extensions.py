from flask_socketio import SocketIO
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

socketio = SocketIO(async_mode='eventlet')
pymongo = PyMongo()
jwt = JWTManager()
bcrypt = Bcrypt()