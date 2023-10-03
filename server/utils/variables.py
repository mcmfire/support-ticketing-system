from flask import jsonify

class Response:
    def __init__(self):
        self.undefined = jsonify({"message": "Something went wrong."}), 500

class File:
    def __init__(self):
        self.type = 'image/jpeg'