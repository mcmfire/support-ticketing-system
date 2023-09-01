from flask_socketio import SocketIO
from flask_pymongo import PyMongo
from flask_caching import Cache
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

socketio = SocketIO(async_mode='eventlet', transports=['websocket', 'polling'])
pymongo = PyMongo()
cache = Cache()
jwt = JWTManager()
bcrypt = Bcrypt()