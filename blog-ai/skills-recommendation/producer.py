from kafka import KafkaProducer

import json

from config import (
    KAFKA_BOOTSTRAP_SERVERS,
    RECOMMENDATION_TOPIC
)

producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
    value_serializer=lambda value:
    json.dumps(value).encode("utf-8")
)


def publish_recommendation(event):

    producer.send(
        RECOMMENDATION_TOPIC,
        event
    )

    producer.flush()