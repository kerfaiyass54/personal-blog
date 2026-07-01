from pydantic import BaseModel


class FlashcardGeneration(BaseModel):
    type: str

    term: str
    value: str