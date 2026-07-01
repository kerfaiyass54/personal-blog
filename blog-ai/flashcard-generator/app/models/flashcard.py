from pydantic import BaseModel


class Flashcard(BaseModel):
    lessonId: str
    lessonTitle: str

    type: str

    term: str
    value: str