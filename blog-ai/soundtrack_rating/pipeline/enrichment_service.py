import json
import joblib
from kafka import KafkaConsumer, KafkaProducer
from datetime import datetime
from elasticsearch import Elasticsearch

from config import *
from utils import fetch_features, prepare_features

# Load model
model = joblib.load(MODEL_PATH)

# Kafka
consumer = KafkaConsumer(
    TOPIC_INPUT,
    bootstrap_servers=KAFKA_BOOTSTRAP,
    value_deserializer=lambda x: json.loads(x.decode("utf-8"))
)

producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP,
    value_serializer=lambda x: json.dumps(x).encode("utf-8")
)

# Elasticsearch
es = Elasticsearch(ELASTIC_URL)

print("🚀 Combined Enrichment + Prediction Service Running...")

for msg in consumer:
    data = msg.value

    print("📥 Received:", data)

    # 🔹 Step 1: Enrichment
    features = fetch_features(data["link"])

    enriched = {
        **data,
        **features
    }

    # 🔹 Step 2: Prediction
    X = prepare_features(enriched)

    prediction = model.predict(X)[0]

    result = {
        "id": data["id"],
        "title": data["title"],
        "link": data["link"],
        "type": data["type"],
        "predicted_rating": float(prediction)
    }

    # 🔹 Send to Spring Boot
    producer.send(TOPIC_RATED, result)

    # 🔹 Save to Elasticsearch
    es.index(index=INDEX_NAME, document={
        **enriched,
        "rating": float(prediction),
        "timestamp": datetime.utcnow()
    })

    print("✅ Done:", result)