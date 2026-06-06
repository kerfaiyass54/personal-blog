import time
import traceback

from consumer import consumer
from recommender import recommend
from producer import publish_recommendation
from models.recommendation import Recommendation


def process_message(message):

    print("\n" + "=" * 60)
    print("RAW KAFKA MESSAGE")
    print("=" * 60)

    print(message)

    print("\nVALUE:")
    print(message.value)

    skill = message.value

    if not isinstance(skill, dict):
        raise Exception(
            f"Expected dict but received {type(skill)}"
        )

    print("\nPARSED JSON:")
    print(skill)

    skill_name = skill.get("name")
    field = skill.get("field")

    if not skill_name:
        raise Exception(
            "Field 'name' not found in message"
        )

    if not field:
        raise Exception(
            "Field 'field' not found in message"
        )

    print(
        f"\n[RECEIVED] Skill={skill_name}, Field={field}"
    )

    recommendations = recommend(
        skill_name
    )

    print(
        f"[AI] Recommendations: {recommendations}"
    )

    event = Recommendation(
        skill_name,
        field,
        recommendations
    )

    payload = event.to_dict()

    print(
        f"[PRODUCING] {payload}"
    )

    publish_recommendation(
        payload
    )

    print(
        f"[SUCCESS] Published recommendations for {skill_name}"
    )


def run():

    print("\n" + "=" * 60)
    print("AI RECOMMENDATION ENGINE STARTED")
    print("=" * 60)
    print(
        "Waiting for messages from topic: skill-created"
    )
    print("=" * 60 + "\n")

    while True:

        try:

            print(
                "[KAFKA] Consumer loop active..."
            )

            for message in consumer:

                print(
                    "\n[KAFKA] Message received"
                )

                try:

                    process_message(
                        message
                    )

                except Exception as e:

                    print(
                        f"\n[MESSAGE ERROR] {e}"
                    )

                    traceback.print_exc()

        except KeyboardInterrupt:

            print(
                "\nEngine stopped manually."
            )

            break

        except Exception as e:

            print(
                f"\n[CONSUMER ERROR] {e}"
            )

            traceback.print_exc()

            print(
                "Retrying in 5 seconds..."
            )

            time.sleep(5)


if __name__ == "__main__":
    run()