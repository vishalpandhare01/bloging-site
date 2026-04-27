
from fastapi import APIRouter , Depends , HTTPException
from app.schemas.user_schemas import User ,UserCreate
from app.config.database import get_db
from app.view.user_view import create_user_in_db , get_user_by_email
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/api/v1/users/", response_model=User)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user_in_db(db=db, user=user)
