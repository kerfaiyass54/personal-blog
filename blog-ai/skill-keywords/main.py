from kafkaFiles.consumer import consume

from agents.consumer_agent import ConsumerAgent
from agents.preprocessing_agent import PreprocessingAgent
from agents.keyword_agent import KeywordAgent
from agents.publisher_agent import PublisherAgent

consumer_agent = ConsumerAgent()
preprocessing_agent = PreprocessingAgent()
keyword_agent = KeywordAgent()
publisher_agent = PublisherAgent()


def start_service():

    print("🚀 Skill Keyword Service Started")
    print("📨 Waiting for skill messages...")

    while True:

        try:

            for message in consume():

                print(f"Received: {message}")

                message = consumer_agent.run(message)

                skill = preprocessing_agent.run(
                    message["skill"]
                )

                result = keyword_agent.run(skill)

                publisher_agent.run(result)

                print(f"Published: {result}")

        except Exception as e:

            print(f"Error: {e}")

            print("Restarting consumer...")


if __name__ == "__main__":
    start_service()