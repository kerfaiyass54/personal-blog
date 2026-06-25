from fastapi import APIRouter

from app.schemas.request import (
    ArticleReviewRequest
)

from app.services.review_service import (
    review_article
)

router = APIRouter()


@router.post("/review")
async def review(
        payload: ArticleReviewRequest
):
    return review_article(
        payload.article
    )