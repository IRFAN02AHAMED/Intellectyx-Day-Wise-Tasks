from sqlalchemy.orm import Session

from app.auth import hash_password
from app.database import SessionLocal, init_db
from app.logger import logger
from app.models.course import Course
from app.models.enrollment import Enrollment
from app.models.student import Student


def seed_database(db: Session) -> None:
    if db.query(Student).filter(Student.is_active.is_(True)).count() > 0:
        logger.info("Database already seeded, skipping")
        return

    admin = Student(
        name="Admin User",
        email="admin@example.com",
        password=hash_password("admin123"),
        role="admin",
        created_by=1,
        updated_by=1,
    )
    student1 = Student(
        name="Alice Johnson",
        email="alice@example.com",
        password=hash_password("password123"),
        role="student",
        created_by=1,
        updated_by=1,
    )
    student2 = Student(
        name="Bob Smith",
        email="bob@example.com",
        password=hash_password("password123"),
        role="student",
        created_by=1,
        updated_by=1,
    )
    db.add_all([admin, student1, student2])
    db.commit()
    db.refresh(admin)
    db.refresh(student1)
    db.refresh(student2)

    courses = [
        Course(
            title="Python Basics",
            description="Learn Python fundamentals from scratch.",
            level="Beginner",
            duration=20,
            popularity=95,
            created_by=admin.id,
            updated_by=admin.id,
        ),
        Course(
            title="React Fundamentals",
            description="Build modern UIs with React hooks and components.",
            level="Beginner",
            duration=30,
            popularity=88,
            created_by=admin.id,
            updated_by=admin.id,
        ),
        Course(
            title="FastAPI Mastery",
            description="Build high-performance APIs with FastAPI.",
            level="Intermediate",
            duration=25,
            popularity=76,
            created_by=admin.id,
            updated_by=admin.id,
        ),
        Course(
            title="PostgreSQL Deep Dive",
            description="Advanced database design and optimization.",
            level="Advanced",
            duration=40,
            popularity=62,
            created_by=admin.id,
            updated_by=admin.id,
        ),
        Course(
            title="Full Stack Architecture",
            description="Design scalable full stack applications.",
            level="Advanced",
            duration=50,
            popularity=70,
            created_by=admin.id,
            updated_by=admin.id,
        ),
    ]
    db.add_all(courses)
    db.commit()
    for course in courses:
        db.refresh(course)

    enrollments = [
        Enrollment(
            student_id=student1.id,
            course_id=courses[0].id,
            progress=45,
            status="enrolled",
            created_by=student1.id,
            updated_by=student1.id,
        ),
        Enrollment(
            student_id=student1.id,
            course_id=courses[2].id,
            progress=100,
            status="completed",
            created_by=student1.id,
            updated_by=student1.id,
        ),
        Enrollment(
            student_id=student2.id,
            course_id=courses[1].id,
            progress=20,
            status="enrolled",
            created_by=student2.id,
            updated_by=student2.id,
        ),
    ]
    db.add_all(enrollments)
    db.commit()
    logger.info("Database seeded with dummy data")


def run_seeder():
    init_db()
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()


if __name__ == "__main__":
    run_seeder()
