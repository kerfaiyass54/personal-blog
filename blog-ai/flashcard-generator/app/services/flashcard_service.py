from app.models.flashcard import Flashcard
from app.models.lesson import Lesson

from app.services.ai_agent import AIAgent
from app.services.kafka_producer import KafkaPublisher


class FlashcardService:

    def __init__(self):
        self.ai_agent = AIAgent()
        self.kafka = KafkaPublisher()

    def generate(
        self,
        lesson: Lesson
    ):

        response_text = self.ai_agent.generate_flashcards(
            lesson.title,
            lesson.content
        )

        result = []

        for line in response_text.splitlines():

            line = line.strip()

            if not line:
                continue

            parts = line.split("|")

            if len(parts) != 3:
                continue

            flashcard = Flashcard(
                lessonId=lesson.id,
                lessonTitle=lesson.title,
                type=parts[0],
                term=parts[1],
                value=parts[2]
            )

            self.kafka.publish(
                flashcard.model_dump()
            )

            result.append(
                flashcard.model_dump()
            )

        return result