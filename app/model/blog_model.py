from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String, Text ,UUID ,Boolean
from sqlalchemy.orm import relationship
from app.config.database import Base
from datetime import datetime
import uuid

class Blog(Base):
    __tablename__="blogs"
    id = Column(String, primary_key=True,default=lambda: str(uuid.uuid4()) , index=True)
    title = Column(String, index=True)
    description = Column(String)
    text = Column(Text)
    author_id = Column(String, ForeignKey("users.id"), nullable=False)
    author = relationship("User")
    created_at = Column(DateTime, default=datetime.utcnow)
    comments = relationship("Comments", back_populates="blog")
    is_deleted = Column(Boolean, default=False)

class Comments(Base):
    __tablename__="comments"
    id = Column(String, primary_key=True,default=lambda: str(uuid.uuid4()) , index=True)
    text = Column(Text)
    blog_id = Column(String, ForeignKey("blogs.id"), nullable=False)
    blog = relationship("Blog")
    author_id = Column(String, ForeignKey("users.id"), nullable=False)
    author = relationship("User")
    created_at = Column(DateTime, default=datetime.utcnow)
