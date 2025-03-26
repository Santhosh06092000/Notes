from fastapi import FastAPI
from database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware
from routers import note_router, user_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(user_router.router)
app.include_router(note_router.router)
