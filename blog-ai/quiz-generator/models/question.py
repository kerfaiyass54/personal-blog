from pydantic import BaseModel
from typing import List


class Question(BaseModel):

    content: str

    possibilities: List[str]

    answer: str

    hint: str