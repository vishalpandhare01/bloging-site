from pydantic import BaseModel
from uuid import UUID

class UserBase(BaseModel):
    name: str
    email:str
    password:str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: UUID

    model_config = {
        "from_attributes": True
    }