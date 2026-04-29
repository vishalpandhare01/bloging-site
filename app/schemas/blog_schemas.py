from pydantic import BaseModel
from uuid import UUID

class User(BaseModel):
    id: UUID
    email: str
    name: str

class BlogBase(BaseModel):
    title: str
    description: str
    text: str


class BlogCreate(BlogBase):
    pass

class Blog(BlogBase):
    id: UUID
    author: User

    model_config = {
        "from_attributes": True
    }

