from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from app.utils.database import db

# Inicialización global
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    
    # Configuración
    app.config.from_object("app.config.Config")
    print(app.config["SQLALCHEMY_DATABASE_URI"])

    # Configuración de CORS
    CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:8080"],  # URL de tu frontend
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
        }
    })

    
    # Inicialización de extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    # Registro de rutas
    from app.routes import auth_routes, movie_routes
    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(movie_routes.bp)
    
    return app