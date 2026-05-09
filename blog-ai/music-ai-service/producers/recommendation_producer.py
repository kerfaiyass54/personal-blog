from config.kafka_config import producer

def send_recommendations(recommendations):

    producer.send(
        "recommendation-events",
        recommendations
    )

    producer.flush()

    print("Recommendations sent to Kafka")