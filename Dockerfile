FROM node:18 as builder
WORKDIR /app
COPY ./frontend .
WORKDIR /app/frontend

RUN yarn
RUN yarn build
RUN rm -rf node_modules
WORKDIR /app

COPY . .
FROM python:3.11-slim-buster

RUN pip install poetry
COPY poetry.lock pyproject.toml ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi
COPY . .
CMD ["uvicorn", "weaviate_ui.main:app", "--host", "0.0.0.0", "--port", "7777"]

