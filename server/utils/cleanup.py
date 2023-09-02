from flask import session
from utils.extensions import cache

def user_data_cleanup(cache_key=None):
    session.clear()
    cache.delete(cache_key)