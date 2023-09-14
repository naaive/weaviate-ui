import uvicorn

if __name__ == "__main__":
    uvicorn.run("weaviate_ui.main:app", host="0.0.0.0", port=7788, reload=True)
