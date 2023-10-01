from flask import request
from services.settings import SettingsService
from utils.user_input import filter_input

class SettingsController(SettingsService):
    def __init__(self):
        super().__init__()
    
    def open_settings(self):
        response = self.load_settings()

        return response
    
    def update_account(self):
        data = request.get_json()
        user_input = filter_input(**data)
        response = self.modify_account(**user_input)

        return response
    
    def delete_account(self):
        data = request.get_json()
        user_input = filter_input(**data)
        response = self.remove_account(**user_input)

        return response