from config.kafka_config import consumer
from services.recommendation_service import generate_recommendations

def start_consumer():

    print("Kafka consumer started...")

    for message in consumer:

        data = message.value

        print("Received:", data)

        generate_recommendations(data)