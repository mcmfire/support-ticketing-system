from flask import jsonify, session
from utils.db import update_user_data
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
