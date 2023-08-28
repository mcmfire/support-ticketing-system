from flask import send_from_directory

class MainService:
    @staticmethod
    def serve_page():
        return send_from_directory('../client/dist', 'index.html')
    
    @staticmethod
    def serve_bundle():
        return send_from_directory('../client/dist', 'bundle.js')