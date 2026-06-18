# Course Enrollment System

Full-stack course enrollment platform with FastAPI, PostgreSQL, React, and Material UI.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Backend | FastAPI, SQLAlchemy, PostgreSQL, Uvicorn, Pytest |
| Frontend | React, Material UI, React Router |
| Auth | JWT (stored in localStorage) |

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app + Uvicorn entry
│   │   ├── database.py          # Shared DB session
│   │   ├── logger.py            # Terminal + file logging
│   │   ├── auth.py              # JWT + password hashing
│   │   ├── seeder.py            # Dummy data seeder
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── schemas/             # Pydantic request/response models
│   │   ├── services/            # Business logic layer
│   │   └── router/              # API routes
│   └── tests/                   # Pytest suite
└── frontend/
    └── src/
        ├── hooks/               # useAuth, useCourses
        ├── components/          # Reusable UI components
        ├── pages/               # Route pages
        └── services/            # API client
```

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 14+

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Update DATABASE_URL and SECRET_KEY
```

Create the database:

```sql
CREATE DATABASE course_enrollment;
```

Run the server:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

App: http://localhost:3000

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Student | alice@example.com | password123 |
| Student | bob@example.com | password123 |

## API Endpoints

### Auth
- `POST /auth/register` — Register student
- `POST /auth/login` — Login (returns JWT)
- `GET /auth/me` — Current user

### Students (Admin)
- `POST /students` · `GET /students` · `GET /students/{id}` · `PUT /students/{id}` · `DELETE /students/{id}`

### Courses
- `GET /courses?level=&sort_by=` — Browse (public)
- `POST /courses` · `PUT /courses/{id}` · `DELETE /courses/{id}` — Admin only

### Enrollments
- `POST /enrollments` — Enroll in course
- `GET /enrollments` — List (students see own; admin sees all)
- `PUT /enrollments/{id}` — Update progress
- `DELETE /enrollments/{id}` — Soft delete

## Running Tests

```bash
cd backend
pytest -v
```

## Key Design Rules

- SQLAlchemy ORM only — all queries filter `is_active = true`
- Soft delete only — records are never hard-deleted
- One shared DB session via FastAPI dependency injection
- Pydantic models for all request/response validation
- Logs written to terminal and `backend/app.log`

## Environment Variables

**Backend** (`.env`):
- `DATABASE_URL` — PostgreSQL connection string
- `SECRET_KEY` — JWT signing key
- `DEBUG` — Enable SQL echo and reload

**Frontend** (`.env`):
- `REACT_APP_API_URL` — Backend URL (default: `http://localhost:8000`)
