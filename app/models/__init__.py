from os import environ

from dotenv import load_dotenv
from peewee import MySQLDatabase

load_dotenv(".env")


def get_sql_uri():
    return f"""mysql://{
            environ.get('DB_USER')
            }:{
                environ.get('DB_PASSWORD')
                }@localhost:3306/spa_assessment"""


def get_db():
    mysql = MySQLDatabase(
        "spa_assessment",
        user=environ.get("DB_USER"),
        password=environ.get("DB_PASSWORD"),
    )
    return mysql
