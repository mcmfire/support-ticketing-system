from utils.extensions import pymongo

def get_user_auth(collection, query, projection={}):
    user = pymongo.cx['auth'][collection].find_one(query, projection)

    if not user:
        return None

    return user