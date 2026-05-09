from pymongo import MongoClient
from config.settings import MONGO_URI

client = MongoClient(MONGO_URI)

db = client["blog_database"]

playlist_collection = db["soundtracks"]