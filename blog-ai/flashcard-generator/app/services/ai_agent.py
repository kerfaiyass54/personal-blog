from google import genai

from app.config.settings import settings
from app.prompts.flashcard_prompt import FLASHCARD_PROMPT


class AIAgent:

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def generate_flashcards(
        self,
        title: str,
        content: str
    ):

        prompt = FLASHCARD_PROMPT.format(
            title=title,
            content=content
        )

        response = self.client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt
        )

        return response.text