from pydantic import BaseModel


class ArticleReviewRequest(BaseModel):
    article: str