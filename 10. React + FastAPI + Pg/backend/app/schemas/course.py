from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, Field


class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    level: Literal["Beginner", "Intermediate", "Advanced"]
    duration: int = Field(gt=0)
    popularity: int = Field(default=0, ge=0)


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    level: Optional[Literal["Beginner", "Intermediate", "Advanced"]] = None
    duration: Optional[int] = Field(default=None, gt=0)
    popularity: Optional[int] = Field(default=None, ge=0)


class CourseResponse(CourseBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
