from flask import send_from_directory

class MainService:
    @staticmethod
    def serve_client():
        return send_from_directory('../client/dist', 'index.html')