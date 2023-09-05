import threading
from utils.db import stream_user_data

class Param:
    task_params = {
        "db": "data",
        "collection": "tasks",
        "event": "message",
        "pipeline": [
            {"$match": {"operationType": {"$in": ['insert', 'update']}}}
        ]
    }

task_stream = threading.Thread(target=stream_user_data, kwargs=Param.task_params)

def init_threads():
    task_stream.daemon = True