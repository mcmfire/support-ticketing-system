from flask import jsonify
from utils.db import get_user_data
from utils.threads import task_stream

class PanelService:
    @staticmethod
    def load_panel():
        tasks = get_user_data('data', 'tasks', {}, {'_id':0}, 'all')
        task_list = [task for task in tasks]

        if not task_stream.is_alive():
            task_stream.start()

        return jsonify({"tasks": task_list}), 200