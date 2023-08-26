from flask import request
from services.auth import AuthService
from utils.user_input import filter_input

class AuthController(AuthService):
    def __init__(self):
        super().__init__()

    def find_user(self):
        data = request.get_json()
        user_input = filter_input(**data)
        response = self.get_user(**user_input)

        return response
    
    def login_user(self):
        data = request.get_json()
        user_input = filter_input(**data)
        response = self.authenticate_user(**user_input)

        return response
    
    def register_user(self):
        data = request.get_json()
        user_input = filter_input(**data)
        response = self.save_user(**user_input)

        return response