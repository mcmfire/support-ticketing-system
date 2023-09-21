from flask import Blueprint
from controllers.settings import SettingsController

settings_bp = Blueprint('settings_bp', __name__, url_prefix='/settings')

settings_bp.route('/account/update-account', methods=['POST'])(SettingsController().update_account)