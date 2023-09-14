import os

import weaviate
from dotenv import load_dotenv
from fastapi import FastAPI
from loguru import logger
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
client = weaviate.Client(
    url=os.getenv("WEAVIATE_URL"),
    auth_client_secret=weaviate.AuthApiKey(api_key=os.getenv("WEAVIATE_API_KEYS")),
)


@app.get("/schema")
def schema() :
    return client.schema.get()


@app.post("/class/{class_name}/{offset}/{limit}/{keyword}")
def class0(class_name: str, offset: int, limit: int, keyword: str='', properties: list[str] = None):
    builder = client.query.get(class_name, properties)
    logger.info(keyword)
    if keyword != "none":
        builder = builder.with_near_text({"concepts" : [keyword]})
    do = builder.with_additional(
        "id").with_offset(offset).with_limit(limit).do()
    count = client.query.aggregate(class_name).with_meta_count().do().get('data').get('Aggregate').get(class_name)[
        0].get('meta').get('count')
    logger.info(count)
    return {
        'data' : do.get('data').get('Get').get(
            class_name),
        'count' : count
    }
app.mount("/", StaticFiles(directory="static",html=True), name="static")
