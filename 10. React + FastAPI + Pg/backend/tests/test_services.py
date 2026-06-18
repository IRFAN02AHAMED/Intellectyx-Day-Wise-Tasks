from app.schemas.course import CourseCreate, CourseUpdate
from app.schemas.enrollment import EnrollmentCreate, EnrollmentUpdate
from app.schemas.student import StudentCreate, StudentUpdate
from app.services import course_service, enrollment_service, student_service


def test_student_service_crud(db_session):
    created = student_service.create_student(
        db_session,
        StudentCreate(name="Service User", email="service@test.com", password="pass123"),
    )
    fetched = student_service.get_student(db_session, created.id)
    assert fetched.name == "Service User"

    updated = student_service.update_student(
        db_session,
        fetched,
        StudentUpdate(name="Updated User"),
    )
    assert updated.name == "Updated User"

    deleted = student_service.soft_delete_student(db_session, updated)
    assert deleted.is_active is False
    assert student_service.get_student(db_session, created.id) is None


def test_course_service_sorting(db_session, admin_user):
    course_service.create_course(
        db_session,
        CourseCreate(title="Short", level="Beginner", duration=5, popularity=10),
        created_by=admin_user.id,
    )
    course_service.create_course(
        db_session,
        CourseCreate(title="Popular", level="Beginner", duration=20, popularity=99),
        created_by=admin_user.id,
    )

    by_popularity = course_service.get_courses(db_session, sort_by="popularity")
    assert by_popularity[0].title == "Popular"

    by_duration = course_service.get_courses(db_session, sort_by="duration")
    assert by_duration[0].title == "Short"


def test_enrollment_service_duplicate_check(db_session, student_user, sample_course):
    enrollment_service.create_enrollment(
        db_session,
        student_user.id,
        EnrollmentCreate(course_id=sample_course.id),
    )
    existing = enrollment_service.get_active_enrollment(
        db_session, student_user.id, sample_course.id
    )
    assert existing is not None

    updated = enrollment_service.update_enrollment(
        db_session,
        existing,
        EnrollmentUpdate(progress=50),
    )
    assert updated.progress == 50
