from flask import send_from_directory

class MainService:
    @staticmethod
    def serve_page(path):
        if path == 'bundle.js':
            return send_from_directory('../client/dist', 'bundle.js')
        
        return send_from_directory('../client/dist', 'index.html')