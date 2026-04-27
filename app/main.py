from fastapi import Depends, FastAPI, HTTPException
from .routes.user_route import router

app = FastAPI()

@app.get("/")
def get_test():
    return {"message":"Hello world"}

app.include_router(router)

