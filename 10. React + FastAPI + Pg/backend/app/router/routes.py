from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.auth import get_current_user, require_admin
from app.database import get_db
from app.schemas.course import CourseCreate, CourseResponse, CourseUpdate
from app.schemas.enrollment import (
    EnrollmentCreate,
    EnrollmentDetailResponse,
    EnrollmentResponse,
    EnrollmentUpdate,
)
from app.schemas.student import StudentCreate, StudentResponse, StudentUpdate
from app.services import course_service, enrollment_service, student_service

router = APIRouter(tags=["crud"])


# ── Students ──────────────────────────────────────────────────────────────────

@router.post("/students", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
def create_student(
    data: StudentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    if student_service.get_student_by_email(db, data.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
    return student_service.create_student(db, data, created_by=current_user.id)


@router.get("/students", response_model=List[StudentResponse])
def list_students(
    role: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    return student_service.get_students(db, role=role)


@router.get("/students/{student_id}", response_model=StudentResponse)
def get_student(student_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    student = student_service.get_student(db, student_id)
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    return student


@router.put("/students/{student_id}", response_model=StudentResponse)
def update_student(
    student_id: int,
    data: StudentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    student = student_service.get_student(db, student_id)
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    return student_service.update_student(db, student, data, updated_by=current_user.id)


@router.delete("/students/{student_id}", response_model=StudentResponse)
def delete_student(
    student_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    student = student_service.get_student(db, student_id)
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    return student_service.soft_delete_student(db, student, updated_by=current_user.id)


# ── Courses ───────────────────────────────────────────────────────────────────

@router.post("/courses", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(
    data: CourseCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    return course_service.create_course(db, data, created_by=current_user.id)


@router.get("/courses", response_model=List[CourseResponse])
def list_courses(
    level: Optional[str] = Query(None),
    sort_by: Optional[str] = Query(None, description="duration or popularity"),
    db: Session = Depends(get_db),
):
    return course_service.get_courses(db, level=level, sort_by=sort_by)


@router.get("/courses/{course_id}", response_model=CourseResponse)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = course_service.get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    return course


@router.put("/courses/{course_id}", response_model=CourseResponse)
def update_course(
    course_id: int,
    data: CourseUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    course = course_service.get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    return course_service.update_course(db, course, data, updated_by=current_user.id)


@router.delete("/courses/{course_id}", response_model=CourseResponse)
def delete_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin),
):
    course = course_service.get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    return course_service.soft_delete_course(db, course, updated_by=current_user.id)


# ── Enrollments ───────────────────────────────────────────────────────────────

@router.post("/enrollments", response_model=EnrollmentResponse, status_code=status.HTTP_201_CREATED)
def create_enrollment(
    data: EnrollmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if not course_service.get_course(db, data.course_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    existing = enrollment_service.get_active_enrollment(db, current_user.id, data.course_id)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Already enrolled")

    return enrollment_service.create_enrollment(
        db, current_user.id, data, created_by=current_user.id
    )


@router.get("/enrollments", response_model=List[EnrollmentDetailResponse])
def list_enrollments(
    student_id: Optional[int] = Query(None),
    course_id: Optional[int] = Query(None),
    status_filter: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if current_user.role != "admin":
        student_id = current_user.id
    return enrollment_service.get_enrollments(
        db, student_id=student_id, course_id=course_id, status=status_filter
    )


@router.get("/enrollments/{enrollment_id}", response_model=EnrollmentDetailResponse)
def get_enrollment(
    enrollment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    enrollment = enrollment_service.get_enrollment(db, enrollment_id)
    if not enrollment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
    if current_user.role != "admin" and enrollment.student_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    return enrollment


@router.put("/enrollments/{enrollment_id}", response_model=EnrollmentResponse)
def update_enrollment(
    enrollment_id: int,
    data: EnrollmentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    enrollment = enrollment_service.get_enrollment(db, enrollment_id)
    if not enrollment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
    if current_user.role != "admin" and enrollment.student_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    return enrollment_service.update_enrollment(
        db, enrollment, data, updated_by=current_user.id
    )


@router.delete("/enrollments/{enrollment_id}", response_model=EnrollmentResponse)
def delete_enrollment(
    enrollment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    enrollment = enrollment_service.get_enrollment(db, enrollment_id)
    if not enrollment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
    if current_user.role != "admin" and enrollment.student_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    return enrollment_service.soft_delete_enrollment(
        db, enrollment, updated_by=current_user.id
    )
