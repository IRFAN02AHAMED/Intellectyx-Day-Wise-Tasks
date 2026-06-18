from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import AuditMixin


class Enrollment(Base, AuditMixin):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    progress = Column(Integer, default=0, nullable=False)
    status = Column(String(50), default="enrolled", nullable=False)

    student = relationship("Student", backref="enrollments")
    course = relationship("Course", backref="enrollments")
