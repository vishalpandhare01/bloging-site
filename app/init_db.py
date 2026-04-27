from app.config.database import Base , engine
from app.model.user_model import User
from sqlalchemy import inspect

def init_db():
    Base.metadata.create_all(bind=engine)
    print("table created successfully")
init_db()
print(inspect(engine).get_table_names())