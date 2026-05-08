import json
import joblib

from kafka import KafkaConsumer, KafkaProducer
from elasticsearch import Elasticsearch
from datetime import datetime

from config import *
from utils import fetch_features, prepare_features

# ===============================
# LOAD MODEL
# ===============================
model = joblib.load(MODEL_PATH)

# ===============================
# KAFKA CONSUMER
# ===============================
consumer = KafkaConsumer(
    TOPIC_INPUT,
    bootstrap_servers=KAFKA_BOOTSTRAP,
    auto_offset_reset="earliest",
    enable_auto_commit=True,
    group_id="soundtrack-group",
    value_deserializer=lambda x: json.loads(x.decode("utf-8"))
)

# ===============================
# KAFKA PRODUCER
# ===============================
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP,
    value_serializer=lambda x: json.dumps(x).encode("utf-8")
)

# ===============================
# ELASTICSEARCH
# ===============================
es = Elasticsearch(ELASTIC_URL)

print("🚀 AI Service Running...")

# ===============================
# CONSUME LOOP
# ===============================
for msg in consumer:

    try:

        data = msg.value

        print("\n📥 Received:", data)

        # ===============================
        # ENRICHMENT
        # ===============================
        features = fetch_features(data["link"])

        enriched = {
            **data,
            **features
        }

        print("🧠 Enriched:", enriched)

        # ===============================
        # PREPARE FEATURES
        # ===============================
        X = prepare_features(enriched)

        # ===============================
        # PREDICT
        # ===============================
        prediction = model.predict(X)[0]

        # ===============================
        # RESULT
        # ===============================
        result = {
            "id": data["id"],
            "title": data["title"],
            "link": data["link"],
            "type": data["type"],
            "author": data["author"],
            "predicted_rating": round(float(prediction), 2)
        }

        # ===============================
        # SEND TO SPRINGBOOT
        # ===============================
        producer.send(TOPIC_RATED, result)

        print("📤 Sent:", result)

        # ===============================
        # SAVE TO ELASTICSEARCH
        # ===============================
        es.index(
            index=INDEX_NAME,
            document={
                **enriched,
                "predicted_rating": float(prediction),
                "timestamp": datetime.utcnow()
            }
        )

        print("Saved to Elasticsearch")

    except Exception as e:

        print("ERROR:", e)