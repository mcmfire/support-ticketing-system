from flask import jsonify, session
from services.auth import AuthService
from utils.extensions import cache
from utils.db import update_user_data, delete_user_data
from utils.variables import Response
from utils.cleanup import user_data_cleanup
from bson import ObjectId

class SettingsService:
    @staticmethod
    def modify_account(**args):
        current_user = session.get('user')

        if not current_user:
            Response().undefined

        data = {}
        query_filter = {"_id": ObjectId(args['_id'])}

        for arg in args:
            if arg != '_id':
                data['$set'] = {arg: args[arg]}
        
        update_user_data('auth', 'profiles', query_filter, data)

        return jsonify({"message": "Account modified."}), 200

    @staticmethod
    def remove_account(refresh_token):
        current_user = session.get('user')

        if not current_user:
            Response().undefined
        
        tasks_deleted = delete_user_data('data', 'tasks', {"username": current_user['username']})
        creds_deleted = delete_user_data('auth', 'credentials', {"username": current_user['username']})
        profile_deleted = delete_user_data('auth', 'profiles', {"_id": current_user['_id']})

        if tasks_deleted and creds_deleted and profile_deleted:
            AuthService().revoke_user(refresh_token)
            return jsonify({"message": "Account deleted."}), 200
        
        return Response().undefined
        