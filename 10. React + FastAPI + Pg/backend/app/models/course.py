from sqlalchemy import Column, Integer, String, Text

from app.database import Base
from app.models.base import AuditMixin


class Course(Base, AuditMixin):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    level = Column(String(50), nullable=False)
    duration = Column(Integer, nullable=False)
    popularity = Column(Integer, default=0, nullable=False)
