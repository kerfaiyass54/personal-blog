from fastapi import APIRouter

from app.schemas.request import PlanRequest
from app.services.ollama_service import generate_plan

router = APIRouter()


@router.post("/generate-plan")
async def create_plan(payload: PlanRequest):

    return generate_plan(
        payload.title
    )