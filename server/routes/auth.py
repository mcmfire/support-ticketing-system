from flask import Blueprint
from controllers.auth import AuthController

auth_bp = Blueprint('auth_bp', __name__)

auth_bp.route('/register-user', methods=['POST'])(AuthController().register_user)