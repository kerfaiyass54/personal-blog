from repositories.soundtrack_repository import (
    get_user_soundtracks,
    get_all_soundtracks
)

from services.similarity_service import (
    extract_preferences
)

from agents.spotify_agent import (
    recommend_spotify
)

from agents.youtube_agent import (
    recommend_youtube
)

from agents.hybrid_agent import (
    merge_recommendations
)


def generate_recommendations(user_id):

    user_tracks = get_user_soundtracks(
        user_id
    )

    all_tracks = get_all_soundtracks()

    preferences = extract_preferences(
        user_tracks
    )

    spotify_recommendations = recommend_spotify(

        all_tracks,
        preferences
    )

    youtube_recommendations = recommend_youtube(

        all_tracks,
        preferences
    )

    final_recommendations = merge_recommendations(

        spotify_recommendations,
        youtube_recommendations
    )

    return [

        recommendation.to_dict()

        for recommendation
        in final_recommendations
    ]