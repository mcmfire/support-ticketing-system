from flask import request, jsonify, send_file
from firebase_admin import storage
from io import BytesIO

def init_firebase_route(app):
    @app.route('/get-avatar/<filename>', methods=['GET'])
    def get_avatar(filename):
        blob = storage.bucket().blob(f'avatars/{filename}.jpg')
        data = blob.download_as_bytes()

        return send_file(BytesIO(data), mimetype='image/jpeg')
    
    @app.route('/upload-avatar/<filename>', methods=['GET'])
    def upload_avatar(filename):
        if 'avatar' not in request.files or request.files['avatar'].filename == '':
            return jsonify({"message": "No image found."}), 404
        
        avatar = request.files['avatar']
        blob = storage.bucket().blob(f'avatars/{filename}.jpg')
        
        blob.upload_from_file(avatar, content_type='image/jpeg')

        return jsonify({"message": "Image uploaded successfully."}), 200
    
def create_avatar(filename):
    blob = storage.bucket().blob('avatars/default.jpg')
    data = blob.download_as_bytes()

    avatar_blob = storage.bucket().blob(f'avatars/{filename}.jpg')
    avatar_blob.upload_from_string(data, content_type='image/jpeg')