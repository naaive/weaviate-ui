FROM node:18 as builder
WORKDIR /app
COPY ./frontend .
WORKDIR /app/frontend

RUN yarn
RUN yarn build

WORKDIR /app

COPY . .
FROM python:3.11-slim-buster

RUN pip install poetry
COPY poetry.lock pyproject.toml ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi
COPY . .
CMD ["python", "-u", "main.py"]
