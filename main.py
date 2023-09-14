import uvicorn

if __name__ == "__main__":
    uvicorn.run("weaviate_ui.main:app", port=7777, reload=True)
