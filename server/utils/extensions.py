from flask_socketio import SocketIO
from flask_pymongo import PyMongo
from flask_caching import Cache
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from config.setup import AppSettings

socketio = SocketIO(async_mode=AppSettings.SOCKETIO_ASYNC_MODE, transports=AppSettings.SOCKETIO_TRANSPORTS)
pymongo = PyMongo()
cache = Cache()
jwt = JWTManager()
bcrypt = Bcrypt()