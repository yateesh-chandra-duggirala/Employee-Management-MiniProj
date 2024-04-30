from sqlalchemy import Column, Integer, String, Float
from database import Base

# ORM is associated with Base. Hence for creation of table we need Base

class Employee(Base):
    __tablename__ = "employee"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable= False)
    sal = Column(Float, nullable= True)