# fastapi - Backend Development of Rest APIs (Too Simple, Easy to Learn)
# uvicorn - acts as the server of fastapi
# pydantic - which provides DTOs of an employee
# Install the above libraries : pip install fastapi

from fastapi import FastAPI, Depends
from typing import Annotated
from pydantic import BaseModel
import model
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

model.Base.metadata.create_all(bind = engine)

# BaseModel is from pydantic and it is used since there is already an exisiting table

class EmployeeDTO(BaseModel):

    name : str
    email : str
    sal : float = None

def get_db():
    db = SessionLocal()

    try : 
        yield db
    finally : 
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

