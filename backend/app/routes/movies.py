from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.tmdb_service import TMDBService
from ..models import Movie, Review, Favorite, Watchlist
from .. import db
from marshmallow import Schema, fields, validate

bp = Blueprint('movies', __name__, url_prefix='/api/movies')

class ReviewSchema(Schema):
    content = fields.Str(required=True, validate=validate.Length(min=1))
    rating = fields.Float(required=True, validate=validate.Range(min=0, max=10))

@bp.route('/popular', methods=['GET'])
def get_popular_movies():
    page = request.args.get('page', 1, type=int)
    try:
        movies = TMDBService.get_popular_movies(page)
        return jsonify(movies), 200
    except Exception as e:
        return jsonify({'error': 'Error fetching popular movies'}), 500

@bp.route('/upcoming', methods=['GET'])
def get_upcoming_movies():
    page = request.args.get('page', 1, type=int)
    try:
        movies = TMDBService.get_upcoming_movies(page)
        return jsonify(movies), 200
    except Exception as e:
        return jsonify({'error': 'Error fetching upcoming movies'}), 500

@bp.route('/search', methods=['GET'])
def search_movies():
    query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    if not query:
        return jsonify({'results': []}), 200
    
    try:
        results = TMDBService.search_movies(query, page)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': 'Error searching movies'}), 500

@bp.route('/<int:movie_id>', methods=['GET'])
def get_movie_details(movie_id):
    try:
        # Obtener detalles de TMDB
        movie_details = TMDBService.get_movie(movie_id)
        if not movie_details:
            return jsonify({'error': 'Movie not found'}), 404
        
        # Obtener reviews de nuestra base de datos
        reviews = Review.query.filter_by(movie_id=movie_id).all()
        reviews_data = [{
            'id': review.id,
            'content': review.content,
            'rating': float(review.rating),
            'user_id': review.user_id,
            'created_at': review.created_at.isoformat()
        } for review in reviews]
        
        # Combinar datos
        movie_details['local_reviews'] = reviews_data
        movie_details['average_local_rating'] = sum(r['rating'] for r in reviews_data) / len(reviews_data) if reviews_data else 0
        
        return jsonify(movie_details), 200
    except Exception as e:
        return jsonify({'error': 'Error fetching movie details'}), 500

@bp.route('/<int:movie_id>/reviews', methods=['POST'])
@jwt_required()
def create_review(movie_id):
    schema = ReviewSchema()
    try:
        data = schema.load(request.json)
        user_id = get_jwt_identity()
        
        # Verificar si el usuario ya ha hecho una review
        existing_review = Review.query.filter_by(
            user_id=user_id,
            movie_id=movie_id
        ).first()
        
        if existing_review:
            return jsonify({'error': 'You have already reviewed this movie'}), 400
        
        review = Review(
            user_id=user_id,
            movie_id=movie_id,
            content=data['content'],
            rating=data['rating']
        )
        
        db.session.add(review)
        db.session.commit()
        
        return jsonify({
            'id': review.id,
            'content': review.content,
            'rating': float(review.rating),
            'created_at': review.created_at.isoformat()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error creating review'}), 500

@bp.route('/<int:movie_id>/reviews/<int:review_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def manage_review(movie_id, review_id):
    user_id = get_jwt_identity()
    review = Review.query.filter_by(
        id=review_id,
        movie_id=movie_id,
        user_id=user_id
    ).first()
    
    if not review:
        return jsonify({'error': 'Review not found'}), 404
    
    try:
        if request.method == 'DELETE':
            db.session.delete(review)
            db.session.commit()
            return '', 204
        
        # PUT
        schema = ReviewSchema()
        data = schema.load(request.json)
        
        review.content = data['content']
        review.rating = data['rating']
        db.session.commit()
        
        return jsonify({
            'id': review.id,
            'content': review.content,
            'rating': float(review.rating),
            'created_at': review.created_at.isoformat()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error managing review'}), 500