from fastapi import FastAPI, HTTPException, Query
from database import create_db_and_tables, SessionDep
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware
from jwt_auth import create_access_token, hash_password, verify_password
from models.user_model import User
from sqlmodel import select

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


# Register a new user
@app.post("/register/")
async def register_user(user: User, session: SessionDep):
    user.password = hash_password(user.password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return {"msg": "User created successfully"}


# Login to get JWT token
@app.post("/login/")
async def login(user_email: str, password: str, session: SessionDep):
    user = session.exec(select(User).where(
        User.user_email == user_email)).first()
    print("user,...", user)
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": user.user_email})
    return {"access_token": token, "user": user}


@app.get("/users/")
async def read_users(session: SessionDep,
                     offset: int = 0,
                     limit: Annotated[int, Query(le=100)] = 100,) -> list[User]:
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
