from utils.extensions import pymongo
from bson import ObjectId

def get_user_data(db, collection, filter, projection={}, amount='one'):
    collection_query = pymongo.cx[db][collection]

    if amount == 'one':
        data = collection_query.find_one(filter, projection)
    elif amount == 'all':
        data = collection_query.find(filter, projection)
    if not data:
        return None

    return data

def update_user_data(db, collection, filter, data, amount='one'):
    collection_query = pymongo.cx[db][collection]

    if amount == 'one':
        data = collection_query.update_one(filter, data)
    elif amount == 'all':
        data = collection_query.update_many(filter, data)
    
    document = collection_query.find_one(filter)

    if not document:
        return None
    
    return document

def delete_user_data(db, collection, filter, amount='one'):
    collection_query = pymongo.cx[db][collection]

    if '_id' in filter:
        filter['_id'] = ObjectId(filter['_id'])
        
    if amount == 'one':
        collection_query.delete_one(filter)
        return True
    elif amount == 'all':
        collection_query.delete_many(filter)
        return True
    
    return False