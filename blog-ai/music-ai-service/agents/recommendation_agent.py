from agents.spotify_agent import get_spotify_recommendations
from agents.youtube_agent import get_youtube_recommendations

def generate_ai_recommendations(stats):

    spotify = get_spotify_recommendations(stats)

    youtube = get_youtube_recommendations(stats)

    return spotify + youtube