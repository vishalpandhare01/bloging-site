
from fastapi import APIRouter , Depends , HTTPException
from app.schemas.blog_schemas import Blog , BlogCreate
from app.config.database import get_db
from app.view.blog_view import create_blog_in_db , get_blogs_from_db , get_blog
from sqlalchemy.orm import Session
from app.middelware.jwt_token import verify_token
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

blog_router = APIRouter()

@blog_router.post("/api/v1/blog/", response_model=Blog)
def create_blog(blog: BlogCreate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Token missing user id")

    return create_blog_in_db(db=db, blog=blog, user_id=user_id)


@blog_router.get("/api/v1/blogs/", response_model=list[Blog])
def get_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_blogs_from_db(db=db, skip=skip, limit=limit)


