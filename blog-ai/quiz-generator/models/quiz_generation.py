from pydantic import BaseModel


class QuizGenerationRequest(BaseModel):

    lessonId: str

    title: str

    content: str

    numberOfQuestions: int