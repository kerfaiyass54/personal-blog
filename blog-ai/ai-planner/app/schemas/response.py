from pydantic import BaseModel
from typing import List


class OutlineSection(BaseModel):
    heading: str
    purpose: str
    ideas: List[str]


class ArticlePlan(BaseModel):
    article_type: str
    target_audience: str
    search_intent: str
    estimated_word_count: int
    seo_keywords: List[str]
    outline: List[OutlineSection]