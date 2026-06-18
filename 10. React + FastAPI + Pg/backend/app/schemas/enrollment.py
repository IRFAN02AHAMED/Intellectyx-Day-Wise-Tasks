from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.course import CourseResponse
from app.schemas.student import StudentResponse


class EnrollmentBase(BaseModel):
    student_id: int
    course_id: int
    progress: int = Field(default=0, ge=0, le=100)
    status: Literal["enrolled", "completed"] = "enrolled"


class EnrollmentCreate(BaseModel):
    course_id: int


class EnrollmentUpdate(BaseModel):
    progress: Optional[int] = Field(default=None, ge=0, le=100)
    status: Optional[Literal["enrolled", "completed"]] = None


class EnrollmentResponse(EnrollmentBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class EnrollmentDetailResponse(EnrollmentResponse):
    student: Optional[StudentResponse] = None
    course: Optional[CourseResponse] = None

    model_config = ConfigDict(from_attributes=True)
