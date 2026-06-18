from typing import List, Optional

from sqlalchemy.orm import Session

from app.logger import logger
from app.models.course import Course
from app.schemas.course import CourseCreate, CourseUpdate


def get_courses(
    db: Session,
    level: Optional[str] = None,
    sort_by: Optional[str] = None,
) -> List[Course]:
    query = db.query(Course).filter(Course.is_active.is_(True))
    if level:
        query = query.filter(Course.level == level)

    if sort_by == "duration":
        query = query.order_by(Course.duration.asc())
    elif sort_by == "popularity":
        query = query.order_by(Course.popularity.desc())
    else:
        query = query.order_by(Course.id.asc())

    logger.debug("Fetching courses level=%s sort_by=%s", level, sort_by)
    return query.all()


def get_course(db: Session, course_id: int) -> Optional[Course]:
    return (
        db.query(Course)
        .filter(Course.id == course_id, Course.is_active.is_(True))
        .first()
    )


def create_course(db: Session, data: CourseCreate, created_by: Optional[int] = None) -> Course:
    course = Course(
        **data.model_dump(),
        created_by=created_by,
        updated_by=created_by,
    )
    db.add(course)
    db.commit()
    db.refresh(course)
    logger.info("Created course id=%s title=%s", course.id, course.title)
    return course


def update_course(
    db: Session, course: Course, data: CourseUpdate, updated_by: Optional[int] = None
) -> Course:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(course, field, value)

    course.updated_by = updated_by
    db.commit()
    db.refresh(course)
    logger.info("Updated course id=%s", course.id)
    return course


def soft_delete_course(db: Session, course: Course, updated_by: Optional[int] = None) -> Course:
    course.is_active = False
    course.updated_by = updated_by
    db.commit()
    db.refresh(course)
    logger.info("Soft deleted course id=%s", course.id)
    return course
