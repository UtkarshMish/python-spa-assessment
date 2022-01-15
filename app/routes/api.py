from app.models import execute_db
from app.models.User import User
from flask import Blueprint, request

api_router = Blueprint("api", __name__, url_prefix="/api")


@api_router.errorhandler(KeyError)
def handle_index_error(err: KeyError):

    return {"success": False, "err": err.args}, 400


@api_router.post("/user")
@execute_db
async def create_user():
    if len(request.json) == 3:

        await User.create(
            user_name=request.json["user_name"],
            email=request.json["email"],
            password=request.json["password"],
        )
        return {"success": True}
    else:
        return {"success": False}, 400


@api_router.delete("/user")
@execute_db
async def delete_user():
    if len(request.json) == 1 and "id" in request.json:
        user: User = await User.get_or_none(id=request.json["id"])

        return (
            {"success": True}
            if user and await user.delete() is None
            else {"success": False}
        )
    else:
        return {"success": False}, 400
