from datetime import datetime
from uuid import UUID
from fastapi import Query, HTTPException
from database import SessionDep
from models.note_model import Note
from sqlmodel import select
from typing import List
from fastapi import APIRouter

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.post("/", response_model=Note)
async def create_note(note: Note, session: SessionDep):
    session.add(note)
    session.commit()
    session.refresh(note)
    return note


@router.get("/", response_model=List[Note])
async def get_notes(session: SessionDep, offset: int = 0, limit: int = Query(100, le=100)):
    notes = session.exec(select(Note).offset(offset).limit(limit)).all()
    return notes


@router.get("/{note_id}", response_model=Note)
async def get_note(note_id: str, session: SessionDep):
    note_uuid = UUID(note_id)
    note = session.get(Note, note_uuid)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@router.put("/{note_id}", response_model=Note)
async def update_note(note_id: str, updated_note: Note, session: SessionDep):
    note_uuid = UUID(note_id)
    note = session.get(Note, note_uuid)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    note.note_title = updated_note.note_title
    note.note_content = updated_note.note_content
    note.last_update = datetime.utcnow()

    session.add(note)
    session.commit()
    session.refresh(note)
    return note


@router.delete("/{note_id}")
async def delete_note(note_id: str, session: SessionDep):
    note_uuid = UUID(note_id)
    note = session.get(Note, note_uuid)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    session.delete(note)
    session.commit()
    return {"message": "Note deleted successfully"}
