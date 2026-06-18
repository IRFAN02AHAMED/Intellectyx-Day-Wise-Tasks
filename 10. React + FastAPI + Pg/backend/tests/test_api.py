from tests.conftest import auth_header


def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_register_and_login(client):
    register_response = client.post(
        "/auth/register",
        json={"name": "New User", "email": "new@test.com", "password": "password123"},
    )
    assert register_response.status_code == 200
    assert "access_token" in register_response.json()

    login_response = client.post(
        "/auth/login",
        json={"email": "new@test.com", "password": "password123"},
    )
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()


def test_list_courses_public(client, sample_course):
    response = client.get("/courses")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["title"] == "Test Course"


def test_create_course_requires_admin(client, student_user, sample_course):
    headers = auth_header(client, "student@test.com", "password123")
    response = client.post(
        "/courses",
        json={
            "title": "New Course",
            "description": "Desc",
            "level": "Beginner",
            "duration": 5,
            "popularity": 10,
        },
        headers=headers,
    )
    assert response.status_code == 403


def test_create_course_as_admin(client, admin_user):
    headers = auth_header(client, "admin@test.com", "admin123")
    response = client.post(
        "/courses",
        json={
            "title": "Admin Course",
            "description": "Created by admin",
            "level": "Intermediate",
            "duration": 15,
            "popularity": 80,
        },
        headers=headers,
    )
    assert response.status_code == 201
    assert response.json()["title"] == "Admin Course"


def test_enroll_in_course(client, student_user, sample_course):
    headers = auth_header(client, "student@test.com", "password123")
    response = client.post(
        "/enrollments",
        json={"course_id": sample_course.id},
        headers=headers,
    )
    assert response.status_code == 201
    assert response.json()["course_id"] == sample_course.id


def test_soft_delete_course(client, admin_user, sample_course):
    headers = auth_header(client, "admin@test.com", "admin123")
    response = client.delete(f"/courses/{sample_course.id}", headers=headers)
    assert response.status_code == 200
    assert response.json()["is_active"] is False

    get_response = client.get(f"/courses/{sample_course.id}")
    assert get_response.status_code == 404
