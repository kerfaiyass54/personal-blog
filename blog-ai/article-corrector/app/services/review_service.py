import requests

from app.config import settings
from app.prompts.review_prompt import PROMPT
import json


def review_article(article: str):

    prompt = PROMPT.format(
        article=article
    )

    response = requests.post(
        f"{settings.OLLAMA_URL}/api/generate",
        json={
            "model": settings.OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        },
        timeout=300
    )

    response.raise_for_status()

    result = response.json()

    raw_response = result["response"].strip()

    if raw_response.startswith("```json"):
        raw_response = raw_response.replace(
            "```json",
            ""
        )

    if raw_response.endswith("```"):
        raw_response = raw_response[:-3]

    raw_response = raw_response.strip()

    try:
        return json.loads(raw_response)

    except Exception as e:
        return {
            "error": str(e),
            "raw_response": raw_response
        }