from kafka import KafkaConsumer
import json

print("Creating Kafka consumer...")

consumer = KafkaConsumer(
    "skill-created",
    bootstrap_servers="localhost:9092",
    group_id="recommendation-group",
    auto_offset_reset="earliest",
    enable_auto_commit=True,
    value_deserializer=lambda x:
        json.loads(
            x.decode("utf-8")
        )
)

print("Kafka consumer created successfully.")