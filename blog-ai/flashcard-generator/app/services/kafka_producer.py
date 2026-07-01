import json
from confluent_kafka import Producer

from app.config.settings import settings


class KafkaPublisher:

    def __init__(self):
        self.producer = Producer(
            {
                "bootstrap.servers": settings.KAFKA_BOOTSTRAP_SERVERS
            }
        )

    def publish(self, payload: dict):

        self.producer.produce(
            settings.KAFKA_TOPIC,
            json.dumps(payload).encode("utf-8")
        )

        self.producer.flush()