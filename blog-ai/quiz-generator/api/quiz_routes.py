from fastapi import APIRouter

from models.quiz_generation import (
    QuizGenerationRequest
)

from services.quiz_service import (
    QuizService
)

router = APIRouter()

service = QuizService()


@router.post("/generate")
def generate_quiz(
    request: QuizGenerationRequest
):

    return service.generate(
        request.lessonId,
        request.title,
        request.content,
        request.numberOfQuestions
    )