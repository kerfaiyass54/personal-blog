def get_youtube_recommendations(stats):

    mood = stats.get("mood", "chill")

    return [
        {
            "platform": "YOUTUBE",
            "title": f"{mood} Mix",
            "author": "DJ Chill",
            "link": "https://youtube.com/example"
        }
    ]