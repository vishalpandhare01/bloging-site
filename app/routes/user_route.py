
from fastapi import APIRouter , Depends , HTTPException
from app.schemas.user_schemas import User ,UserCreate ,Userlogin
from app.config.database import get_db
from app.view.user_view import create_user_in_db , get_user_by_email , get_user
from sqlalchemy.orm import Session
from app.middelware.jwt_token import create_access_token , verify_token
from app.utils.password_hash import verify_password
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

router = APIRouter()

@router.post("/api/v1/user/", response_model=User)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user_in_db(db=db, user=user)

@router.post("/api/v1/login/")
def login(form_data: Userlogin ,db: Session = Depends(get_db) ):
    user = get_user_by_email(db, email=form_data.email)

    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": form_data.email , "user_id":user.id})

    return {"access_token": token, "token_type": "bearer"}

@router.get("/api/v1/user/", response_model=User)
def get_login_user(token: str = Depends(oauth2_scheme) ,db: Session = Depends(get_db) ):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Token missing user id")

    db_user = get_user(db, user_id=user_id)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user
