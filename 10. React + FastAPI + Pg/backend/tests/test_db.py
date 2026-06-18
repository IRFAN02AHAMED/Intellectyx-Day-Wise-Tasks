from app.models.course import Course
from app.models.enrollment import Enrollment
from app.models.student import Student
from app.schemas.course import CourseCreate
from app.services import course_service, enrollment_service, student_service
from app.schemas.enrollment import EnrollmentCreate
from app.schemas.student import StudentCreate


def test_create_student(db_session):
    data = StudentCreate(name="Jane", email="jane@test.com", password="secret123")
    student = student_service.create_student(db_session, data)
    assert student.id is not None
    assert student.is_active is True


def test_get_students_filters_inactive(db_session):
    active = Student(name="Active", email="active@test.com", password="hash", role="student")
    inactive = Student(
        name="Inactive",
        email="inactive@test.com",
        password="hash",
        role="student",
        is_active=False,
    )
    db_session.add_all([active, inactive])
    db_session.commit()

    students = student_service.get_students(db_session)
    assert len(students) == 1
    assert students[0].email == "active@test.com"


def test_create_and_filter_courses(db_session, admin_user):
    course_service.create_course(
        db_session,
        CourseCreate(
            title="Beginner Course",
            description="Desc",
            level="Beginner",
            duration=10,
            popularity=90,
        ),
        created_by=admin_user.id,
    )
    course_service.create_course(
        db_session,
        CourseCreate(
            title="Advanced Course",
            description="Desc",
            level="Advanced",
            duration=30,
            popularity=50,
        ),
        created_by=admin_user.id,
    )

    beginner_courses = course_service.get_courses(db_session, level="Beginner")
    assert len(beginner_courses) == 1
    assert beginner_courses[0].level == "Beginner"


def test_enrollment_progress_completes(db_session, student_user, sample_course):
    enrollment = enrollment_service.create_enrollment(
        db_session,
        student_user.id,
        EnrollmentCreate(course_id=sample_course.id),
    )
    from app.schemas.enrollment import EnrollmentUpdate

    updated = enrollment_service.update_enrollment(
        db_session,
        enrollment,
        EnrollmentUpdate(progress=100),
    )
    assert updated.progress == 100
    assert updated.status == "completed"
