from models.recommendation_model import Recommendation

from utils.scoring import calculate_score


def recommend_spotify(

    tracks,
    preferences

):

    recommendations = []

    favorite_authors = preferences["authors"]

    for track in tracks:

        if track.get("type") != "SPOTIFY":
            continue

        author = track.get(
            "author",
            ""
        ).lower()

        if author in favorite_authors:

            score = (
                calculate_score(track)
                + 0.5
            )

            recommendations.append(

                Recommendation(

                    title=track["title"],
                    author=track["author"],
                    link=track["link"],
                    type=track["type"],
                    score=score,
                    source_user=str(track["user"].id)
                )

            )

    return recommendations