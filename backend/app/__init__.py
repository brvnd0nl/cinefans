from flask import Flask
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
    
    # Inicialización de extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    # Registro de rutas
    from app.routes import auth_routes, movie_routes
    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(movie_routes.bp)
    
    return app