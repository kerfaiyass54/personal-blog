from fastapi import APIRouter, HTTPException

from app.models.lesson import Lesson
from app.services.flashcard_service import FlashcardService



router = APIRouter()


@router.post("/generate")
def generate_flashcards(lesson: Lesson):

    try:
        service = FlashcardService()

        cards = service.generate(lesson)

        return {
            "count": len(cards),
            "flashcards": cards
        }

    except Exception as e:
        print("ERROR:", repr(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )