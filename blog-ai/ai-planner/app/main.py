from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.planner import router


app = FastAPI(
    title="Blog Planner API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",  # Angular
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(
    router,
    prefix="/api"
)


@app.get("/")
def root():
    return {
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "UP"
    }