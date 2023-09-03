from utils.extensions import pymongo

def get_user_data(db, collection, query, projection={}):
    user = pymongo.cx[db][collection].find_one(query, projection)

    if not user:
        return None

    return user