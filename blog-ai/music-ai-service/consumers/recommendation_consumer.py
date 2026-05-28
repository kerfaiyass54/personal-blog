from config.kafka_config import create_consumer

from agents.recommendation_agent import (
    RecommendationAgent
)

from producers.recommendation_producer import (
    RecommendationProducer
)


class RecommendationConsumer:

    def __init__(self):

        self.consumer = create_consumer()

        self.agent = RecommendationAgent()

        self.producer = RecommendationProducer()

    def start(self):

        print("Kafka consumer started...")

        for message in self.consumer:

            # -----------------------------------
            # ALREADY A PYTHON DICT
            # -----------------------------------

            data = message.value

            print("Received:")
            print(data)

            email = data["email"]

            # -----------------------------------
            # GENERATE RECOMMENDATIONS
            # -----------------------------------

            recommendations = (
                self.agent.recommend(email)
            )


            # -----------------------------------
            # SEND RECOMMENDATIONS
            # -----------------------------------

            print(recommendations)

            self.producer.send_recommendations(
                email=email,
                recommendations=recommendations
            )

            print("Recommendations sent.")