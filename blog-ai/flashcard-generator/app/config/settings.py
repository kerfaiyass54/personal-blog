from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    GEMINI_API_KEY: str

    GEMINI_MODEL: str = "gemini-2.5-flash"

    KAFKA_BOOTSTRAP_SERVERS: str
    KAFKA_TOPIC: str

    class Config:
        env_file = ".env"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()