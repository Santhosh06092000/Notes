from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
import uuid


class Note(SQLModel, table=True):
    note_id: Optional[uuid.UUID] = Field(
        default_factory=uuid.uuid4, primary_key=True)
    note_title: str = Field(index=True, max_length=255)
    note_content: str
    last_update: datetime = Field(default_factory=datetime.utcnow)
    created_on: datetime = Field(default_factory=datetime.utcnow)
