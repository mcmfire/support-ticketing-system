from flask import jsonify, session
from services.auth import AuthService
from utils.db import get_user_data, update_user_data, delete_user_data
from utils.variables import Response
from bson import ObjectId

class SettingsService:
    @staticmethod
    def load_settings():
        current_user = session.get('user')

        user = get_user_data('auth', 'profiles', {"username": current_user['username']}, {"_id": 0})

        return jsonify({"account": user})
    
    @staticmethod
    def modify_account(**args):
        current_user = session.get('user')
        
        if not current_user:
            Response().undefined

        data = {"$set": {}}
        query_filter = {"_id": ObjectId(current_user['_id'])}

        for arg in args:
            if arg != '_id':
                data['$set'].update({arg: args[arg]})
        
        update_user_data('auth', 'profiles', query_filter, data)

        return jsonify({"message": "Account modified."}), 200

    @staticmethod
    def remove_account(refresh_token):
        current_user = session.get('user')

        if not current_user:
            Response().undefined
        
        tasks_deleted = delete_user_data('data', 'tasks', {"username": current_user['username']})
        creds_deleted = delete_user_data('auth', 'credentials', {"username": current_user['username']})
        profile_deleted = delete_user_data('auth', 'profiles', {"username": current_user['username']})

        if tasks_deleted and creds_deleted and profile_deleted:
            AuthService().revoke_user(refresh_token)
            return jsonify({"message": "Account deleted."}), 200
        
        return Response().undefined
        