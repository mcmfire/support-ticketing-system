from flask import jsonify, session
from models.task import Task
from utils.extensions import pymongo, socketio
from utils.db import get_user_data, update_user_data
from utils.variables import Response

class PanelService:
    @staticmethod
    def load_panel():
        tasks = get_user_data('data', 'tasks', {}, {"_id": 0}, 'all')
        task_list = [task for task in tasks]

        return jsonify({"tasks": task_list}), 200
    
    @staticmethod
    def add_task(contact, title, description):
        current_user = session.get('user')
        
        if current_user:
            user = get_user_data('auth', 'profiles', {"username": current_user['username']}, 
                                {"_id" :0, "email": 0})
            username = user['username']
            reporter = user['first_name'] + " " + user['last_name']
            position = user['position']
            department = user['department']
            task = Task(username, reporter, position, department, contact, title, description)
            
            document = {}

            for key, value in vars(task).items():
                if value != '':
                    document.update({key:value})

            pymongo.cx['data']['tasks'].insert_one(document)
            document['_id'] = str(document['_id'])
            socketio.emit('task', document)

            return jsonify({"message": "Task created."}), 200
        
        return Response().undefined
    
    @staticmethod
    def modify_task(**args):
        current_user = session.get('user')

        if current_user:
            data = {}
            
            for arg in args:
                data[arg] = args[arg]
            
            updated_document = update_user_data('data', 'tasks', {"username": current_user['username']}, data)
            socketio.emit('task', updated_document)

            return jsonify({"message": "Task updated."}), 200

        return Response().undefined