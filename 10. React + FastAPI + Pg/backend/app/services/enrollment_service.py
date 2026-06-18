from typing import List, Optional

from sqlalchemy.orm import Session, joinedload

from app.logger import logger
from app.models.enrollment import Enrollment
from app.schemas.enrollment import EnrollmentCreate, EnrollmentUpdate


def get_enrollments(
    db: Session,
    student_id: Optional[int] = None,
    course_id: Optional[int] = None,
    status: Optional[str] = None,
) -> List[Enrollment]:
    query = (
        db.query(Enrollment)
        .options(joinedload(Enrollment.student), joinedload(Enrollment.course))
        .filter(Enrollment.is_active.is_(True))
    )
    if student_id:
        query = query.filter(Enrollment.student_id == student_id)
    if course_id:
        query = query.filter(Enrollment.course_id == course_id)
    if status:
        query = query.filter(Enrollment.status == status)

    logger.debug(
        "Fetching enrollments student_id=%s course_id=%s status=%s",
        student_id,
        course_id,
        status,
    )
    return query.all()


def get_enrollment(db: Session, enrollment_id: int) -> Optional[Enrollment]:
    return (
        db.query(Enrollment)
        .options(joinedload(Enrollment.student), joinedload(Enrollment.course))
        .filter(Enrollment.id == enrollment_id, Enrollment.is_active.is_(True))
        .first()
    )


def get_active_enrollment(db: Session, student_id: int, course_id: int) -> Optional[Enrollment]:
    return (
        db.query(Enrollment)
        .filter(
            Enrollment.student_id == student_id,
            Enrollment.course_id == course_id,
            Enrollment.is_active.is_(True),
        )
        .first()
    )


def create_enrollment(
    db: Session,
    student_id: int,
    data: EnrollmentCreate,
    created_by: Optional[int] = None,
) -> Enrollment:
    enrollment = Enrollment(
        student_id=student_id,
        course_id=data.course_id,
        created_by=created_by,
        updated_by=created_by,
    )
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    logger.info(
        "Created enrollment id=%s student_id=%s course_id=%s",
        enrollment.id,
        enrollment.student_id,
        enrollment.course_id,
    )
    return enrollment


def update_enrollment(
    db: Session,
    enrollment: Enrollment,
    data: EnrollmentUpdate,
    updated_by: Optional[int] = None,
) -> Enrollment:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(enrollment, field, value)

    if enrollment.progress >= 100:
        enrollment.progress = 100
        enrollment.status = "completed"

    enrollment.updated_by = updated_by
    db.commit()
    db.refresh(enrollment)
    logger.info("Updated enrollment id=%s progress=%s", enrollment.id, enrollment.progress)
    return enrollment


def soft_delete_enrollment(
    db: Session, enrollment: Enrollment, updated_by: Optional[int] = None
) -> Enrollment:
    enrollment.is_active = False
    enrollment.updated_by = updated_by
    db.commit()
    db.refresh(enrollment)
    logger.info("Soft deleted enrollment id=%s", enrollment.id)
    return enrollment
