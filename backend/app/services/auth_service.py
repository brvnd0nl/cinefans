from flask_jwt_extended import create_access_token
from datetime import timedelta
from ..models.user import User
from .. import db

class AuthService:
    @staticmethod
    def register(username, email, password):
        if User.query.filter_by(username=username).first():
            raise ValueError('Username already exists')
        if User.query.filter_by(email=email).first():
            raise ValueError('Email already exists')
            
        user = User(
            username=username,
            email=email,
            password_hash=User.hash_password(password).decode('utf-8')
        )
        
        db.session.add(user)
        db.session.commit()
        
        return create_access_token(identity=user.id)
    
    @staticmethod
    def login(email, password):
        user = User.query.filter_by(email=email).first()
        if not user or not user.verify_password(password):
            raise ValueError('Invalid email or password')
            
        return create_access_token(identity=user.id)