from datetime import datetime
from sqlalchemy.orm import Session

from app.model.user_model import User
from app.schemas.user_schemas import UserCreate
from app.utils.password_hash import hash_password

def get_user(db: Session, user_id: int):
    return db.query(model.User).filter(model.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users_from_db(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def create_user_in_db(db: Session, user: UserCreate):
    db_user = User(name=user.name, email=user.email , password=hash_password(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
