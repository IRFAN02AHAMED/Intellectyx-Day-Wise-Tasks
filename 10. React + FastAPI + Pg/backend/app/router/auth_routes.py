from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import (
    create_access_token,
    get_current_user,
    require_admin,
    to_auth_user,
    verify_password,
)
from app.database import get_db
from app.schemas.auth import AuthUserResponse, LoginRequest, RegisterRequest, TokenResponse
from app.schemas.student import StudentCreate
from app.services import student_service

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    if student_service.get_student_by_email(db, data.email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    student = student_service.create_student(
        db,
        StudentCreate(name=data.name, email=data.email, password=data.password),
    )
    token = create_access_token({"sub": str(student.id), "role": student.role})
    return TokenResponse(access_token=token)


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    student = student_service.get_student_by_email(db, data.email)
    if not student or not verify_password(data.password, student.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": str(student.id), "role": student.role})
    return TokenResponse(access_token=token)


@router.get("/me", response_model=AuthUserResponse)
def me(current_user=Depends(get_current_user)):
    return to_auth_user(current_user)
