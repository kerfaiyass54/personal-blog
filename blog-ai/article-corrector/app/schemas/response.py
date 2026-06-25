from pydantic import BaseModel


class Mistake(BaseModel):
    start: int
    end: int
    text: str
    correction: str
    reason: str
    severity: str


class ReviewResponse(BaseModel):
    mistakes: list[Mistake]