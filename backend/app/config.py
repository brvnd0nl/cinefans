import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Agrega un print para debug
    print("Cargando configuración...")
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-temporal')
    TMDB_API_KEY = os.getenv("TMDB_API_KEY")
    
    # Agrega esto para verificar la conexión
    @staticmethod
    def init_app(app):
        pass