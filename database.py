from sqlalchemy import create_engine

from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine

DATABASE_URL = "mysql+pymysql://root:Admin@localhost:3306/notes"

engine = create_engine(DATABASE_URL)


# create db and tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# session dependancy


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
