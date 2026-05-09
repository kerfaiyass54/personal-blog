from repositories.elastic_repository import (
    save_recommendation
)

from datetime import datetime


def save_all_to_elastic(

    user_id,
    recommendations

):

    for recommendation in recommendations:

        document = {

            "userId": user_id,

            "title":
                recommendation.get("title"),

            "author":
                recommendation.get("author"),

            "link":
                recommendation.get("link"),

            "type":
                recommendation.get("type"),

            "score":
                recommendation.get("score"),

            "createdAt":
                datetime.utcnow().isoformat()
        }

        save_recommendation(document)

    print(
        f"{len(recommendations)} recommendations saved to Elasticsearch"
    )