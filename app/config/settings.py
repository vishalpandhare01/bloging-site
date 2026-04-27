from pydantic_settings import BaseSettings
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent  # go up 1 folder

class Settings(BaseSettings):
    app_name : str = "bloging-site"
    debug :bool = True
    data_base_url :str 

    class Config:
        env_file = BASE_DIR / ".env"

settings = Settings()
