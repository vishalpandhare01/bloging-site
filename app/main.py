from fastapi import Depends, FastAPI, HTTPException
from .routes.user_route import user_router
from .routes.blog_route import blog_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # allowed domains
    allow_credentials=True,
    allow_methods=["*"],            # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],            # allow all headers
)

@app.get("/")
def get_test():
    return {"message":"Hello world"}

app.include_router(user_router)
app.include_router(blog_router)


