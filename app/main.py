from fastapi import Depends, FastAPI, HTTPException
from .routes.user_route import user_router
from .routes.blog_route import blog_router

app = FastAPI()

@app.get("/")
def get_test():
    return {"message":"Hello world"}

app.include_router(user_router)
app.include_router(blog_router)


