import json
import httpx

from fastapi import HTTPException

from app.config import settings
from app.prompts.planner_prompt import PROMPT


OLLAMA_URL = "http://localhost:11434/api/generate"


def generate_plan(title: str):

    prompt = PROMPT.format(
        title=title
    )

    try:

        response = httpx.post(
            OLLAMA_URL,
            json={
                "model": settings.OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False
            },
            timeout=1200
        )

        response.raise_for_status()

        content = response.json()["response"]

        content = (
            content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(content)

    except json.JSONDecodeError:

        raise HTTPException(
            status_code=500,
            detail="Model returned invalid JSON."
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )