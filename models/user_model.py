from sqlmodel import Field, SQLModel
from typing import Optional
from datetime import datetime
import uuid


class User(SQLModel, table=True):
    user_id: Optional[uuid.UUID] = Field(
        default_factory=uuid.uuid4, primary_key=True)
    user_name: str = Field(index=True, max_length=255)
    user_email: Optional[str] = Field(index=True, max_length=255)
    password: str = Field(max_length=255)
    last_update: datetime = Field(default_factory=datetime.utcnow)
    created_on: datetime = Field(default_factory=datetime.utcnow)
