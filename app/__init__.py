from flask import Flask

from app.models import get_sql_uri
from app.routes.home import home_route


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = get_sql_uri()
    app.register_blueprint(home_route)
    return app
