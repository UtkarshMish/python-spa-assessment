from os import environ

from flask import Flask
from flask_json import FlaskJSON
from flask_seasurf import SeaSurf
from flask_talisman import Talisman

from app.routes.api import api_router
from app.routes.home import home_route


def create_app() -> Flask:
    app = Flask(__name__)
    FlaskJSON(app)
    app.secret_key = environ.get("SECRET_KEY")
    app.register_blueprint(api_router)
    app.register_blueprint(home_route)
    talisman = Talisman()
    talisman.init_app(app)
    csrf = SeaSurf(app)
    csrf.exempt_urls("/api/auth")
    return app
