from flask import Blueprint
from controllers.settings import SettingsController

settings_bp = Blueprint('settings_bp', __name__, url_prefix='/settings')

settings_bp.route('/open-settings', methods=['GET'])(SettingsController().open_settings)
settings_bp.route('/account/update', methods=['POST'])(SettingsController().update_account)
settings_bp.route('/account/delete', methods=['DELETE'])(SettingsController().delete_account)