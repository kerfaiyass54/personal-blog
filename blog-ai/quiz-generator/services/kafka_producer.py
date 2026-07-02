import json

from kafka import KafkaProducer


class KafkaPublisher:

    def __init__(self):

        self.producer = KafkaProducer(
            bootstrap_servers="localhost:9092",
            value_serializer=lambda v:
            json.dumps(v).encode("utf-8")
        )

    def publish(
            self,
            payload: dict
    ):

        self.producer.send(
            "quiz-generated",
            payload
        )

        self.producer.flush()