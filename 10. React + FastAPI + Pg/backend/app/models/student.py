from sqlalchemy import Column, Integer, String

from app.database import Base
from app.models.base import AuditMixin


class Student(Base, AuditMixin):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    role = Column(String(50), default="student", nullable=False)
