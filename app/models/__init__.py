from asyncio.coroutines import coroutine
from os import environ
from typing import Callable

from dotenv import load_dotenv
from tortoise import Tortoise

load_dotenv(".env")


def get_sql_uri():
    return f"""mysql://{
            environ.get('DB_USER')
            }:{
                environ.get('DB_PASSWORD')
                }@localhost:3306/spa_assessment"""


def execute_db(function: Callable):
    async def func(*args, **kwargs):
        await Tortoise.init(
            db_url=get_sql_uri(),
            modules={"models": ["app.models.User"]},
            _create_db=False,
            use_tz=True,
        )
        await Tortoise.generate_schemas()
        try:
            data = await function(*args, **kwargs)
        finally:
            await Tortoise.close_connections()
        return data

    func.__name__ = function.__name__
    return func
