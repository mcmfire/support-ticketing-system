from flask import jsonify, session
from models.task import Task
from utils.extensions import pymongo, socketio
from utils.db import get_user_data, update_user_data
from utils.variables import Response
from bson import ObjectId

class PanelService:
    @staticmethod
    def load_panel():
        task_list = []
        user_list = []

        tasks = get_user_data('data', 'tasks', {}, {}, 'all')
        users = get_user_data('auth', 'profiles', {}, {}, 'all')

        for task in tasks:
            task['_id'] = str(task['_id'])
            task['upvotes'] = len(task['upvotes'])
            task_list.append(task)
        
        for user in users:
            user['_id'] = str(user['_id'])
            user_list.append(user)

        return jsonify({"tasks": task_list, "users": user_list}), 200
    
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
            task = Task(username, reporter, position, department, title, description, contact)
            
            document = {}

            for key, value in vars(task).items():
                document.update({key:value})

            pymongo.cx['data']['tasks'].insert_one(document)
            document['_id'] = str(document['_id'])
            document['upvotes'] = len(document['upvotes'])
            socketio.emit('task', document)

            return jsonify({"message": "Task created."}), 200
        
        return Response().undefined
    
    @staticmethod
    def modify_task(**args):
        current_user = session.get('user')

        if not current_user:
            return Response().undefined
        
        data = {}
        query_filter = {"_id": ObjectId(args['_id'])}
        
        if "respondent" not in args and "upvote" not in args:
            query_filter.update({"username": current_user['username']})

        task = get_user_data('data', 'tasks', query_filter,
                                {"_id": 0, "username": 0, "reporter": 0, "department": 0, 
                                "position": 0, "contact": 0, "title": 0, "date_created": 0})
        
        if "upvote" in args:
            if args['upvote'] not in task['upvotes']:
                data['$push'] = {"upvotes": args['upvote']}
            else:
                data['$pull'] = {"upvotes": args['upvote']}
        elif "respondent" in args and task['respondent'] == args['respondent']:
            data['$set'] = {'respondent': None}
        else:
            for arg in args:
                if arg != '_id':
                    data['$set'] = {arg: args[arg]}

        updated_document = update_user_data('data', 'tasks', query_filter, data)
        updated_document['_id'] = str(updated_document['_id'])
        updated_document['upvotes'] = len(updated_document['upvotes'])
        socketio.emit('task', updated_document)

        return jsonify({"message": "Task updated."}), 200