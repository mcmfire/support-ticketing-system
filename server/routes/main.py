from flask import Blueprint
from controllers.main import MainController
from routes.auth import auth_bp

main_bp = Blueprint('main_bp', __name__)

main_bp.route('/', defaults={"path": ""})(MainController().serve_template)
main_bp.route('/<path:path>')(MainController().serve_template)