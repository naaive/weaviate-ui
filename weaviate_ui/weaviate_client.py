import os

import weaviate
from dotenv import load_dotenv

load_dotenv()
WEAVIATE_API_KEYS = os.getenv("WEAVIATE_API_KEYS", None)
client = weaviate.Client(
    url=os.getenv("WEAVIATE_URL"),
    auth_client_secret=weaviate.AuthApiKey(api_key=WEAVIATE_API_KEYS) if WEAVIATE_API_KEYS else None,
)

if __name__ == '__main__' :
    print(client.query.get("Lens",['body']).with_limit(10).do())
