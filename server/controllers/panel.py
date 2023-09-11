from flask import request
from services.panel import PanelService
from utils.user_input import filter_input

class PanelController(PanelService):
    def __init__(self):
        super().__init__()

    def open_panel(self):
        response = self.load_panel()

        return response
    
    def create_task(self):
        data = request.get_json()
        user_input = filter_input(**data)
        response = self.add_task(**user_input)

        return response
    
    def update_task(self):
        data = request.get_json()
        user_input = filter_input(**data)
        response = self.modify_task(**user_input)

        return response