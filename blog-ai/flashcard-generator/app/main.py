from fastapi import FastAPI

from app.api.flashcard_routes import router

app = FastAPI(
    title="Flashcard Generator"
)

app.include_router(
    router,
    prefix="/flashcards",
    tags=["Flashcards"]
)