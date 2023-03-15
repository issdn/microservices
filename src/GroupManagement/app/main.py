from fastapi import FastAPI
import uvicorn
from .routers import group

from dotenv import load_dotenv
load_dotenv()


app = FastAPI()
app.include_router(group.router)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
