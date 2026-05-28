from consumers.recommendation_consumer import (
    RecommendationConsumer
)


def main():

    consumer = RecommendationConsumer()

    consumer.start()


if __name__ == "__main__":
    main()