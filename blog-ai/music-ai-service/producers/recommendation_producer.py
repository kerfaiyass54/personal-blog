from config.kafka_config import (
    create_producer,
    OUTPUT_TOPIC
)


class RecommendationProducer:

    def __init__(self):

        self.producer = create_producer()

    def send_recommendations(
        self,
        email,
        recommendations
    ):

        payload = {
            "email": email,
            "recommendations": recommendations
        }

        self.producer.send(
            OUTPUT_TOPIC,
            value=payload
        )

        self.producer.flush()

        print("Recommendations sent.")