from config.kafka_config import producer


def send_recommendations(

    user_id,
    recommendations

):

    payload = {

        "userId": user_id,

        "recommendations":
            recommendations
    }

    producer.send(

        "recommendation_results",

        payload
    )

    producer.flush()

    print(
        "Recommendations sent to Kafka"
    )