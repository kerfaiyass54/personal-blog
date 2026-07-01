from pydantic import BaseModel
from datetime import datetime


class Lesson(BaseModel):
    id: str
    title: str
    content: str
    dateInsert: datetime