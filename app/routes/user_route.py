
from fastapi import APIRouter , Depends , HTTPException , Response , Request
from app.schemas.user_schemas import User ,UserCreate ,Userlogin
from app.config.database import get_db
from app.view.user_view import create_user_in_db , get_user_by_email , get_user
from sqlalchemy.orm import Session
from app.middelware.jwt_token import create_access_token , verify_token
from app.utils.password_hash import verify_password
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

user_router = APIRouter()

@user_router.post("/api/v1/user/", response_model=User)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user_in_db(db=db, user=user)

@user_router.post("/api/v1/login/" )
def login(response: Response , form_data: Userlogin ,db: Session = Depends(get_db) ):
    user = get_user_by_email(db, email=form_data.email)

    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": form_data.email , "user_id":user.id})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax"
    )

    return {"access_token": token}

@user_router.get("/api/v1/user/", response_model=User)
def get_login_user(request: Request ,db: Session = Depends(get_db) ):
    token = request.cookies.get("access_token")

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
