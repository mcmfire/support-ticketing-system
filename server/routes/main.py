from flask import Blueprint
from controllers.main import MainController

main_bp = Blueprint('main_bp', __name__)

main_bp.route('/', defaults={"path": ""})(MainController().serve_template)
main_bp.route('/<path:path>')(MainController().serve_template)