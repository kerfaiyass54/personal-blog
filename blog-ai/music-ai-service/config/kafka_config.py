from kafka import KafkaConsumer, KafkaProducer
from config.settings import KAFKA_BROKER
import json

producer = KafkaProducer(
    bootstrap_servers=KAFKA_BROKER,
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

consumer = KafkaConsumer(
    "playlist-events",
    bootstrap_servers=KAFKA_BROKER,
    auto_offset_reset="earliest",
    enable_auto_commit=True,
    group_id="soundtrack-group",
    value_deserializer=lambda x: json.loads(x.decode("utf-8"))
)