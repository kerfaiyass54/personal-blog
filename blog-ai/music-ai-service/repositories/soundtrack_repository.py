from config.mongo_config import (
    playlist_collection
)


def get_user_soundtracks(user_id):

    return list(

        playlist_collection.find({

            "user.$id": user_id

        })

    )


def get_all_soundtracks():

    return list(

        playlist_collection.find()

    )