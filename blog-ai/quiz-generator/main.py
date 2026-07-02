from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.quiz_routes import router

app = FastAPI(
    title="Quiz Generator"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    router,
    prefix="/quiz",
    tags=["Quiz"]
)