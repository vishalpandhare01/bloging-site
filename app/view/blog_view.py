from datetime import datetime
from sqlalchemy.orm import Session
from app.model.user_model import User
from app.schemas.blog_schemas import BlogCreate
from app.model.blog_model import Blog 
from sqlalchemy.orm import joinedload , load_only , selectinload
from sqlalchemy import or_

def get_blog(db: Session, blog_id: str):
    return db.query(Blog).filter(Blog.id == blog_id and not Blog.is_deleted).first()

def get_blogs_from_db(db: Session, skip: int = 0, limit: int = 100, title: str = None):
    query = db.query(Blog).filter(Blog.is_deleted == False)

    if title:
        search = f"%{title}%"

        query = query.filter(
            or_(
                Blog.title.ilike(search),
                Blog.description.ilike(search),
                Blog.text.ilike(search),
                Blog.author.has(User.name.ilike(search))
            )
        )

    return (
        query
        .options(
            selectinload(Blog.author).load_only(
                User.id,
                User.name,
                User.email
            )
        )
        .order_by(Blog.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

def create_blog_in_db(db: Session, blog: BlogCreate, user_id: str):
    db_blog = Blog(title=blog.title, description=blog.description, text=blog.text, author_id=user_id)
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

def update_blog_in_db(db: Session, blog_id: str, user_id: str, blog: BlogCreate):
    db_blog = db.query(Blog).filter(Blog.id == blog_id, Blog.author_id == user_id).first()
    if db_blog:
        db_blog.title = blog.title
        db_blog.description = blog.description
        db_blog.text = blog.text
        db.commit()
        db.refresh(db_blog)
    return db_blog

def delete_blog_in_db(db: Session, blog_id: str, user_id: str):
    db_blog = db.query(Blog).filter(Blog.id == blog_id, Blog.author_id == user_id , Blog.is_deleted == False).first()
    if db_blog:
        db_blog.is_deleted = True
        db.commit()
        db.refresh(db_blog)
    return db_blog

