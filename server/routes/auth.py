from flask import Blueprint
from controllers.auth import AuthController
from middlewares.token import verify_token

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/auth')

auth_bp.before_app_request(verify_token)

auth_bp.route('/find-user', methods=['POST'])(AuthController().find_user)
auth_bp.route('/login-user', methods=['POST'])(AuthController().login_user)
auth_bp.route('/register-user', methods=['POST'])(AuthController().register_user)
auth_bp.route('/logout-user', methods=['POST'])(AuthController().logout_user)