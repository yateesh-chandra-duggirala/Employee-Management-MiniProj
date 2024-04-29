from sqlalchemy import create_engine, Column, Integer, String, Float
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, DeclarativeBase

URL = "postgresql+psycopg2://postgres:postgres@localhost/backend_employee"

engine = create_engine(URL)

class Base(DeclarativeBase):
    pass

class Employee(Base):

    __tablename__ = "employee"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    sal = Column(Float, nullable= True)
    dept = Column(String, nullable=False)
    exp = Column(Integer, nullable=True)
    email = Column(String, nullable= False)

session = Session(engine)

obj = Employee(name = "Priya", sal = 78000.7, dept = "HR", exp = 6, email = "priyanvita@gmail.com")

session.add(obj)
session.commit()