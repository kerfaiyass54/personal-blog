from services.ai_agent import AIAgent
from services.kafka_producer import KafkaPublisher


class QuizService:

    def __init__(self):

        self.ai = AIAgent()

        self.kafka = KafkaPublisher()

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

        self.kafka.publish(payload)

        return payload