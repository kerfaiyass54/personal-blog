import json
from confluent_kafka import Producer


class KafkaPublisher:

    def __init__(self):

        self.producer = Producer(
            {
                "bootstrap.servers":
                "localhost:9092"
            }
        )

    def publish(
        self,
        payload
    ):

        self.producer.produce(
            "skills_enriched",
            json.dumps(payload).encode()
        )

        self.producer.flush()