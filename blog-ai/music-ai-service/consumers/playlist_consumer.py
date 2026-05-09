from config.kafka_config import consumer

from services.recommendation_service import (
    generate_recommendations
)

from producers.recommendation_producer import (
    send_recommendations
)

from services.elastic_service import (
    save_all_to_elastic
)


def start_playlist_consumer():

    print(
        "Kafka Consumer Started..."
    )

    for message in consumer:

        try:

            payload = message.value

            print(
                f"Received: {payload}"
            )

            user_id = payload["userId"]

            recommendations = generate_recommendations(
                user_id
            )

            save_all_to_elastic(

                user_id,
                recommendations
            )

            send_recommendations(

                user_id,
                recommendations
            )

        except Exception as e:

            print(
                f"Consumer Error: {e}"
            )