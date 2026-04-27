from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String, Text ,UUID
from sqlalchemy.orm import relationship
from app.config.database import Base
import uuid

class User(Base):
    __tablename__ = "users"
    # id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)  # for big appas
    id = Column(String, primary_key=True,default=lambda: str(uuid.uuid4()) , index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
