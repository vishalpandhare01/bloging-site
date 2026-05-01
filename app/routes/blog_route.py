
from fastapi import APIRouter , Depends , HTTPException , Request
from app.schemas.blog_schemas import Blog , BlogCreate
from app.config.database import get_db
from app.view.blog_view import (
    create_blog_in_db ,
    get_blogs_from_db , 
    get_blog , 
    update_blog_in_db ,
    delete_blog_in_db,
    )
from sqlalchemy.orm import Session
from app.middelware.jwt_token import verify_token
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

blog_router = APIRouter()

@blog_router.post("/api/v1/blog/", response_model=Blog)
def create_blog(blog: BlogCreate, request: Request, db: Session = Depends(get_db)):
    
    token = request.cookies.get("access_token")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Token missing user id")

    return create_blog_in_db(db=db, blog=blog, user_id=user_id)

@blog_router.get("/api/v1/blogs/")
def get_blogs(title : str = None, cursor: str = None, limit: int = 100, db: Session = Depends(get_db)):

    data, next_c = get_blogs_from_db(db, cursor, limit ,title=title)

    return {
        "data": data,
        "next_cursor": next_c,
    }

@blog_router.get("/api/v1/blog/{blog_id}", response_model=Blog)
def get_blog_by_id(blog_id: str, db: Session = Depends(get_db)):
    db_blog = get_blog(db, blog_id=blog_id)
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return db_blog

@blog_router.put("/api/v1/blog/{blog_id}", response_model=Blog)
def update_blog(blog_id: str, blog: BlogCreate, request: Request, db: Session = Depends(get_db)):
    
    token = request.cookies.get("access_token")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Token missing user id")

    db_blog = update_blog_in_db(db=db, blog_id=blog_id, user_id=user_id, blog=blog)
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found or you are not the author")
    return db_blog

@blog_router.delete("/api/v1/blog/{blog_id}")
def delete_blog(blog_id: str, request: Request, db: Session = Depends(get_db)):
    
    token = request.cookies.get("access_token")
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Token missing user id")

    db_blog = delete_blog_in_db(db=db, blog_id=blog_id, user_id=user_id)
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found or you are not the author")
    return {"detail": "Blog deleted successfully"}


