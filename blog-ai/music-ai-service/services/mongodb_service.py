from bson import ObjectId

from config.mongo_config import get_database

from utils.text_cleaner import clean_text


class MongoDBService:

    def __init__(self):

        self.db = get_database()

        self.users_collection = self.db["users"]

        self.soundtracks_collection = self.db["soundtracks"]

    def find_user_by_email(
        self,
        email
    ):

        return self.users_collection.find_one({
            "email": email
        })

    def find_user_soundtracks(
        self,
        user_id
    ):

        tracks = list(
            self.soundtracks_collection.find({
                "user.$id": ObjectId(user_id)
            })
        )

        # CLEAN TRACK TITLES

        for track in tracks:

            track["title"] = clean_text(
                track.get("title", "")
            )

        return tracks