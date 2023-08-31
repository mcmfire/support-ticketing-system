from flask import jsonify

class PanelService:
    @staticmethod
    def load_panel():
        return jsonify({"message": "Panel page."}), 200