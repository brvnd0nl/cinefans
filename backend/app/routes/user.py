from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User, Favorite, Watchlist, Movie
from .. import db
from marshmallow import Schema, fields

bp = Blueprint('user', __name__, url_prefix='/api/user')

class UserProfileSchema(Schema):
    username = fields.Str()
    email = fields.Email()

@bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'created_at': user.created_at.isoformat()
    }), 200

@bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    schema = UserProfileSchema()
    try:
        data = schema.load(request.json)
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Verificar username único si se está actualizando
        if 'username' in data and data['username'] != user.username:
            if User.query.filter_by(username=data['username']).first():
                return jsonify({'error': 'Username already taken'}), 400
            user.username = data['username']
        
        # Verificar email único si se está actualizando
        if 'email' in data and data['email'] != user.email:
            if User.query.filter_by(email=data['email']).first():
                return jsonify({'error': 'Email already taken'}), 400
            user.email = data['email']
        
        db.session.commit()
        return jsonify({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'created_at': user.created_at.isoformat()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error updating profile'}), 500

@bp.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    movie_ids = [fav.movie_id for fav in favorites]
    
    # Obtener detalles de películas de TMDB
    movies = []
    for movie_id in movie_ids:
        movie_details = TMDBService.get_movie(movie_id)
        if movie_details:
            movies.append(movie_details)
    
    return jsonify(movies), 200

@bp.route('/favorites/<int:movie_id>', methods=['POST', 'DELETE'])
@jwt_required()
def manage_favorite(movie_id):
    user_id = get_jwt_identity()
    
    favorite = Favorite.query.filter_by(
        user_id=user_id,
        movie_id=movie_id
    ).first()
    
    try:
        if request.method == 'POST':
            if favorite:
                return jsonify({'error': 'Movie already in favorites'}), 400
            
            favorite = Favorite(user_id=user_id, movie_id=movie_id)
            db.session.add(favorite)
            db.session.commit()
            return jsonify({'message': 'Movie added to favorites'}), 201
        
        # DELETE
        if not favorite:
            return jsonify({'error': 'Movie not in favorites'}), 404
        
        db.session.delete(favorite)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error managing favorites'}), 500

@bp.route('/watchlist', methods=['GET'])
@jwt_required()
def get_watchlist():
    user_id = get_jwt_identity()
    watchlist = Watchlist.query.filter_by(user_id=user_id).all()
    movie_ids = [item.movie_id for item in watchlist]
    
    # Obtener detalles de películas de TMDB
    movies = []
    for movie_id in movie_ids:
        movie_details = TMDBService.get_movie(movie_id)
        if movie_details:
            movies.append(movie_details)
    
    return jsonify(movies), 200

@bp.route('/watchlist/<int:movie_id>', methods=['POST', 'DELETE'])
@jwt_required()
def manage_watchlist(movie_id):
    user_id = get_jwt_identity()
    
    watchlist_item = Watchlist.query.filter_by(
        user_id=user_id,
        movie_id=movie_id
    ).first()
    
    try:
        if request.method == 'POST':
            if watchlist_item:
                return jsonify({'error': 'Movie already in watchlist'}), 400
            
            watchlist_item = Watchlist(user_id=user_id, movie_id=movie_id)
            db.session.add(watchlist_item)
            db.session.commit()
            return jsonify({'message': 'Movie added to watchlist'}), 201
        
        # DELETE
        if not watchlist_item:
            return jsonify({'error': 'Movie not in watchlist'}), 404
        
        db.session.delete(watchlist_item)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error managing watchlist'}), 500