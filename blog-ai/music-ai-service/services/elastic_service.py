from config.elastic_config import es
from config.settings import ELASTIC_INDEX

def save_recommendations(recommendations):

    for recommendation in recommendations:

        es.index(
            index=ELASTIC_INDEX,
            document=recommendation
        )

    print("Recommendations saved to Elasticsearch")