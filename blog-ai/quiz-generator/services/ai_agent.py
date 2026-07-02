import json

from google import genai

from prompts.quiz_prompt import (
    build_quiz_prompt
)

from config.settings import settings


class AIAgent:

    def __init__(self):

        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def generate_quiz(
        self,
        title: str,
        content: str,
        count: int
    ):

        prompt = build_quiz_prompt(
            title,
            content,
            count
        )

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()

        text = text.replace(
            "```json",
            ""
        )

        text = text.replace(
            "```",
            ""
        )

        return json.loads(text)