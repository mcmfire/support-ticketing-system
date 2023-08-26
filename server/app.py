from flask import Flask
from routes.auth import auth_bp
from utils.extensions import pymongo, jwt
from config.setup import AppSettings

def create_app():
    app = Flask(__name__)
    app.config.from_object(AppSettings)

    pymongo.init_app(app)
    jwt.init_app(app)

    return app


if __name__ == '__main__':
    app = create_app()
    app.register_blueprint(auth_bp)
    app.run(host='localhost', port=5000)