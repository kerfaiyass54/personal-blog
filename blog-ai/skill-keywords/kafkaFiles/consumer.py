import json
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    "skills-topic",
    bootstrap_servers="localhost:9092",
    value_deserializer=lambda x:
        json.loads(x.decode())
)

def consume():

    for msg in consumer:
        yield msg.value