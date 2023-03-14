import logging
from fastapi import FastAPI, HTTPException
import uvicorn
from src.db_context import SessionContextManager
from src.models.group import GroupDTO
import traceback
import os

from dotenv import load_dotenv
load_dotenv()


app = FastAPI()


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
