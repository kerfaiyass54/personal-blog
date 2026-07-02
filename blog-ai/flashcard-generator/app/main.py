from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.flashcard_routes import router

app = FastAPI(
    title="Flashcard Generator API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router,
    prefix="/flashcards",
    tags=["Flashcards"]
)