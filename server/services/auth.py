from models.user import User

class AuthService:
    def __init__(self):
        pass

    def save_user(self, email, username, password, first_name, last_name):
        user = User(email, username, password, first_name, last_name)
        response = user.save()

        return response