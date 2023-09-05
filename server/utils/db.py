from utils.extensions import pymongo

def get_user_data(db, collection, query, projection={}, amount='one'):
    collection_query = pymongo.cx[db][collection]

    if amount == 'one':
        data = collection_query.find_one(query, projection)
    elif amount == 'all':
        data = collection_query.find(query, projection)

    if not data:
        return None

    return data

def stream_user_data(db, collection, event, pipeline=None):
    data_stream = pymongo.cx[db][collection].watch(pipeline=pipeline)

    for data in data_stream:
        if data['operationType'] == 'insert' or data['operationType'] == 'update':
            print(event, data['updateDescription']['updatedFields'])