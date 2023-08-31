from flask import Blueprint
from controllers.panel import PanelController

panel_bp = Blueprint('panel_bp', __name__, url_prefix='/panel')

panel_bp.route('/open-panel', methods=['GET'])(PanelController().open_panel)