from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class StudentBase(BaseModel):
    name: str
    email: EmailStr
    role: Literal["student", "admin"] = "student"


class StudentCreate(StudentBase):
    password: str = Field(min_length=6)


class StudentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[Literal["student", "admin"]] = None
    password: Optional[str] = Field(default=None, min_length=6)


class StudentResponse(StudentBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
