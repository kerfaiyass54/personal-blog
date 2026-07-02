from pydantic import BaseModel
from typing import List

from models.question import Question


class Quiz(BaseModel):

    lessonId: str

    lessonTitle: str

    numberOfQuestions: int

    questions: List[Question]