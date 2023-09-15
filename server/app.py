from flask import Flask
from middlewares.token import verify_token
from routes.auth import auth_bp
from routes.panel import panel_bp
from networks.socket import init_socket
from utils.extensions import socketio, pymongo, cache, jwt, bcrypt
from utils.firebase import init_firebase_route
from utils.serve import serve_client
from config.setup import AppSettings, FirebaseSettings, firebase_admin

def create_app():
    app = Flask(__name__)
    app.config.from_object(AppSettings)

    socketio.init_app(app)
    pymongo.init_app(app)
    cache.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)

    firebase_admin.initialize_app(FirebaseSettings.CREDENTIALS, FirebaseSettings.OPTIONS)

    app.register_blueprint(auth_bp)
    app.register_blueprint(panel_bp)
    app.before_request(verify_token)
    
    serve_client(app)
    init_socket()
    init_firebase_route(app)

    return app

if __name__ == '__main__':
    app = create_app()
    socketio.run(app, host='0.0.0.0', port=5000)