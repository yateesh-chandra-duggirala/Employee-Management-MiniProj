# fastapi - Backend Development of Rest APIs (Too Simple, Easy to Learn)
# uvicorn - acts as the server of fastapi
# pydantic - which provides DTOs of an employee
# Install the above libraries : pip install fastapi

from fastapi import FastAPI, Depends
from typing import Annotated
from pydantic import BaseModel
import model
from model import Employee
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

# Create - Post
# Delete - Delete
# Update - Put
# Select -  Get

@app.post("/employee")
def create_employee(employee : EmployeeDTO, db : db_dependency):
    emp_obj = Employee(name = employee.name, email = employee.email, sal = employee.sal)
    db.add(emp_obj)
    db.commit()
    return "Successfully added"

@app.get("/employee")
def get_employee(db:db_dependency):
    result = db.query(Employee).all()
    return result

    # all() - Fetches all rows from the table
    # fetchone() - Fetches 1 row from the table
    # fetchmany(n) - Fetches n rows from the table

@app.get("/employee/{emp_id}")
def get_employee_by_id(emp_id : int, db : db_dependency):
    result = db.query(Employee).filter(Employee.id == emp_id).first()
    return result