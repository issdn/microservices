from fastapi import FastAPI
from pydantic import BaseModel

class Group(BaseModel):
    name: str

app = FastAPI()


@app.get("/create_group")
def create_group(group_name: str):
    return {"group_name": group_name}
    