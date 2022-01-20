# Python SPA Assessment

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)

## About <a name = "about"></a>

Python SPA assessment to develop an application having FLASK as backend with MYSQL as Database System, implemented Flask pytest to test for routes.

## Getting Started <a name = "getting_started"></a>

Have used pipenv as package management

### Prerequisites

1. python v3.10+
2. pipenv (`pip install pipenv`)
3. for frontend (node v15.7+)

### Installing

1. install python dependencies(`pipenv install`)
2. for frontend install frontend dependencies in frontend folder (`npm install`)
3. Set up .env for Backend as follows: \
   DB_USER = `"<db user name>"`\
   DB_PASSWORD = `"<db password>"`\
   SALT_VALUE = `"<password salt>"`\
   SECRET_KEY = `"<flask secret key>"`

4. run python (`pipenv run python main.py`)
5. for frontend move to frontend directory and run `npm install`
