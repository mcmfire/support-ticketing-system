from flask import Blueprint
from controllers.panel import PanelController

panel_bp = Blueprint('panel_bp', __name__, url_prefix='/panel')

panel_bp.route('/open-panel', methods=['GET'])(PanelController().open_panel)
panel_bp.route('/create-task', methods=['POST'])(PanelController().create_task)
panel_bp.route('/update-task', methods=['PATCH'])(PanelController().update_task)
panel_bp.route('/delete-task', methods=['DELETE'])(PanelController().delete_task)