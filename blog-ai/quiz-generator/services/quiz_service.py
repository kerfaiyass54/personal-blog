from services.ai_agent import AIAgent
from services.kafka_producer import KafkaPublisher


class QuizService:

    def __init__(self):

        self.ai = AIAgent()
        self.kafka = None

    def generate(
        self,
        lesson_id: str,
        title: str,
        content: str,
        count: int
    ):

        questions = self.ai.generate_quiz(
            title,
            content,
            count
        )

        payload = {

            "lessonId": lesson_id,

            "lessonTitle": title,

            "numberOfQuestions": count,

            "questions": questions
        }

        if self.kafka is None:
            self.kafka = KafkaPublisher()

        self.kafka.publish(payload)

        return payload