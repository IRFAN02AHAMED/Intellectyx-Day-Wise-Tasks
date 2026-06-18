from typing import List, Optional

from sqlalchemy.orm import Session

from app.auth import hash_password
from app.logger import logger
from app.models.student import Student
from app.schemas.student import StudentCreate, StudentUpdate


def get_students(db: Session, role: Optional[str] = None) -> List[Student]:
    query = db.query(Student).filter(Student.is_active.is_(True))
    if role:
        query = query.filter(Student.role == role)
    logger.debug("Fetching students with role=%s", role)
    return query.all()


def get_student(db: Session, student_id: int) -> Optional[Student]:
    return (
        db.query(Student)
        .filter(Student.id == student_id, Student.is_active.is_(True))
        .first()
    )


def get_student_by_email(db: Session, email: str) -> Optional[Student]:
    return (
        db.query(Student)
        .filter(Student.email == email, Student.is_active.is_(True))
        .first()
    )


def create_student(db: Session, data: StudentCreate, created_by: Optional[int] = None) -> Student:
    student = Student(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role=data.role,
        created_by=created_by,
        updated_by=created_by,
    )
    db.add(student)
    db.commit()
    db.refresh(student)
    logger.info("Created student id=%s email=%s", student.id, student.email)
    return student


def update_student(
    db: Session, student: Student, data: StudentUpdate, updated_by: Optional[int] = None
) -> Student:
    update_data = data.model_dump(exclude_unset=True)
    if "password" in update_data:
        update_data["password"] = hash_password(update_data["password"])

    for field, value in update_data.items():
        setattr(student, field, value)

    student.updated_by = updated_by
    db.commit()
    db.refresh(student)
    logger.info("Updated student id=%s", student.id)
    return student


def soft_delete_student(db: Session, student: Student, updated_by: Optional[int] = None) -> Student:
    student.is_active = False
    student.updated_by = updated_by
    db.commit()
    db.refresh(student)
    logger.info("Soft deleted student id=%s", student.id)
    return student
