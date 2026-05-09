from collections import Counter


def extract_preferences(soundtracks):

    authors = []
    platforms = []

    for track in soundtracks:

        if track.get("author"):

            authors.append(

                track["author"].lower()
            )

        if track.get("type"):

            platforms.append(
                track["type"]
            )

    return {

        "authors": Counter(authors),

        "platforms": Counter(platforms)
    }