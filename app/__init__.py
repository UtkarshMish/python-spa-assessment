from flask import Flask

from app.routes.api import api_router
from app.routes.home import home_route


def create_app() -> Flask:
    app = Flask(__name__)
    app.register_blueprint(api_router)
    app.register_blueprint(home_route)
    return app
