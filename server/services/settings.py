from flask import jsonify, session
from utils.db import update_user_data, delete_user_data
from utils.variables import Response
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
    def remove_account():
        current_user = session.get('user')

        if not current_user:
            Response().undefined
            
        creds_deleted = delete_user_data('auth', 'credentials', {"username": current_user['username']})
        profile_deleted = delete_user_data('auth', 'profiles', {"_id": current_user['_id']})

        if creds_deleted and profile_deleted:
            return jsonify({"message": "Account deleted."}), 200
        
        return Response().undefined
        