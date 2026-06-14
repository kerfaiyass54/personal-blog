from pydantic import BaseModel


class SkillProfile(BaseModel):

    skill: str

    keywords: list[str]

    message: str