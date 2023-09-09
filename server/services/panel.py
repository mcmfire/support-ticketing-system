from flask import jsonify, session
from models.task import Task
from utils.extensions import pymongo
from utils.db import get_user_data
from utils.threads import task_stream

class PanelService:
    @staticmethod
    def load_panel():
        tasks = get_user_data('data', 'tasks', {}, {"_id": 0}, 'all')
        task_list = [task for task in tasks]

        if not task_stream.is_alive():
            task_stream.start()

        return jsonify({"tasks": task_list}), 200
    
    @staticmethod
    def add_task(contact, title, description):
        current_user = session.get('user')
        user = get_user_data('auth', 'profiles', {"username": current_user['username']}, 
                             {"_id" :0, "email": 0, "username": 0})
        reporter = user['first_name'] + " " + user['last_name']
        task = Task(reporter, contact, title, description)
        
        document = {}

        for key, value in vars(task).items():
            if value != '':
                document.update({key:value})

        pymongo.cx['data']['tasks'].insert_one(document)

        return jsonify({"message": "Task created."}), 200