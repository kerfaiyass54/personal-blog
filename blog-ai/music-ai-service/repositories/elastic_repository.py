from config.elastic_config import es


def save_recommendation(document):

    es.index(

        index="music_recommendations",

        document=document
    )