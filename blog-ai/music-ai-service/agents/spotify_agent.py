def get_spotify_recommendations(stats):

    genre = stats.get("favoriteGenre", "pop")

    return [
        {
            "platform": "SPOTIFY",
            "title": f"{genre} Song 1",
            "author": "Artist A",
            "link": "https://open.spotify.com/example1"
        },
        {
            "platform": "SPOTIFY",
            "title": f"{genre} Song 2",
            "author": "Artist B",
            "link": "https://open.spotify.com/example2"
        }
    ]