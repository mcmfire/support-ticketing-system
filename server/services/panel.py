from flask import jsonify
from networks.socket import init_socket

class PanelService:
    @staticmethod
    def load_panel():
        init_socket()
        
        return jsonify({"message": "Panel page opened."}), 200