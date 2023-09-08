from flask import jsonify
from models.task import Task
from utils.extensions import pymongo
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
    
    @staticmethod
    def add_task(reporter, contact, title, description):
        task = Task(reporter, contact, title, description)
        
        document = {}

        for key, value in vars(task).items():
            if value:
                document.update({key:value})

        pymongo.cx['data']['tasks'].insert_one(document)

        return jsonify({"message": "Task created."}), 200