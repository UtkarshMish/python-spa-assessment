from os import environ
from os.path import abspath, join
from posixpath import dirname
from typing import Dict, Literal

from flask import Flask
from flask_json import FlaskJSON
from flask_seasurf import SeaSurf
from flask_talisman import Talisman

from app.routes.api import api_router
from app.routes.home import home_route

SELF = "'self'"
csp: Dict[Literal["default-src", "script-src", "img-src", "style-src"], str] = {
    "default-src": SELF,
    "script-src": SELF,
    "img-src": SELF,
    "style-src": "'unsafe-inline'",
}


def create_app() -> Flask:
    app = Flask(__name__, static_folder=join(dirname(abspath(__file__)), "static"))
    FlaskJSON(app)
    app.secret_key = environ.get("SECRET_KEY")
    app.register_blueprint(api_router)
    app.register_blueprint(home_route)
    talisman = Talisman()
    talisman.init_app(
        app,
        content_security_policy=csp,
        content_security_policy_nonce_in=["script-src"],
    )
    csrf = SeaSurf(app)
    csrf.exempt_urls("/api/auth")
    return app
