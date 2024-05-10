# fastapi - Backend Development of Rest APIs (Too Simple, Easy to Learn)
# uvicorn - acts as the server of fastapi
# pydantic - which provides DTOs of an employee
# Install the above libraries : pip install fastapi

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware                         
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

@app.post("/employee", status_code=201)
def create_employee(employee : EmployeeDTO, db : db_dependency):
    emp_obj = Employee(name = employee.name, email = employee.email, sal = employee.sal)
    print(emp_obj.email)
    email_check = db.query(Employee).filter(Employee.email == emp_obj.email).first()
    print(email_check)
    if email_check != None :
        raise HTTPException(status_code=409, detail="Duplicate Email Ids not allowed")
    if not emp_obj.email.endswith("@gmail.com"):
        raise HTTPException(status_code=400, detail="Invalid Email")
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

@app.put("/employee/{emp_id}")
def update_employee(emp_id : int, employee : EmployeeDTO, db : db_dependency):
    result = db.query(Employee).filter(Employee.id == emp_id).first()
    result.email = employee.email
    result.name = employee.name
    result.sal = employee.sal
    db.commit()
    return "Updated Successfully"

@app.delete("/employee/{emp_id}")
def delete_employee(emp_id : int, db: db_dependency):
    result = db.query(Employee).filter(Employee.id == emp_id).first()
    if result is None :
        raise HTTPException(status_code=404, detail = "Concerned Employee with this id is not found")
    db.delete(result)
    db.commit()
    return "Deleted Successfully"


app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)