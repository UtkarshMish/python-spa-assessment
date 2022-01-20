from flask.testing import FlaskClient


def test_home_page_with_fixture(test_client: FlaskClient):
    response = test_client.get("/")
    assert response.status_code == 302


def test_home_page_post_with_fixture(test_client: FlaskClient):
    response = test_client.get("/logout")
    assert response.status_code == 302
