from flask import jsonify, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Review, User
from app.services.tmdb_service import get_movie_reviews as get_tmdb_reviews
from sqlalchemy.exc import OperationalError, SQLAlchemyError

def get_movie_reviews(movie_id):
    """Obtiene todas las reseñas de una película, combinando TMDB y locales"""
    local_reviews_data = []
    tmdb_reviews = []

    try:
        # Intentar obtener reseñas locales
        try:
            local_reviews = Review.query.filter_by(movie_id=movie_id).order_by(Review.created_at.desc()).all()
            local_reviews_data = [review.to_dict() for review in local_reviews]
        except (OperationalError, SQLAlchemyError) as db_error:
            current_app.logger.error(f"Error de base de datos: {str(db_error)}")
            local_reviews_data = []  # Si hay error en DB, continuar con lista vacía

        # Obtener reseñas de TMDB
        tmdb_data = get_tmdb_reviews(movie_id)
        
        if isinstance(tmdb_data, dict) and 'results' in tmdb_data:
            tmdb_reviews = [{
                'id': review.get('id'),
                'content': review.get('content'),
                'rating': round(review.get('rating', 0) / 2),  # Convertir de escala 1-10 a 1-5
                'created_at': review.get('created_at'),
                'user': {
                    'id': review.get('author_details', {}).get('id'),
                    'username': review.get('author'),
                },
                'source': 'TMDB'
            } for review in tmdb_data.get('results', [])]

        # Combinar y ordenar todas las reseñas
        all_reviews = [{**review, 'source': 'local'} for review in local_reviews_data] + tmdb_reviews
        all_reviews.sort(key=lambda x: x['created_at'], reverse=True)

        return jsonify({
            'reviews': all_reviews,
            'total_count': len(all_reviews),
            'local_count': len(local_reviews_data),
            'tmdb_count': len(tmdb_reviews)
        })

    except Exception as e:
        current_app.logger.error(f"Error al obtener reseñas: {str(e)}")
        # En caso de error general, intentar devolver al menos las reseñas de TMDB
        return jsonify({
            'reviews': tmdb_reviews,
            'total_count': len(tmdb_reviews),
            'local_count': 0,
            'tmdb_count': len(tmdb_reviews),
            'error': "Error al obtener reseñas locales"
        })

@jwt_required()
def create_review(movie_id):
    """Crea una nueva reseña para una película"""
    try:
        data = request.get_json()
        
        # Validar datos requeridos
        if not all(key in data for key in ['content', 'rating']):
            return jsonify({"error": "Faltan campos requeridos"}), 400
        
        # Validar rating
        rating = int(data['rating'])
        if not 1 <= rating <= 5:
            return jsonify({"error": "El rating debe estar entre 1 y 5"}), 400

        # Obtener usuario actual
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        # Verificar si el usuario ya ha hecho una reseña para esta película
        existing_review = Review.query.filter_by(
            movie_id=movie_id,
            user_id=current_user_id
        ).first()
        
        if existing_review:
            return jsonify({"error": "Ya has publicado una reseña para esta película"}), 400

        # Crear nueva reseña
        new_review = Review(
            content=data['content'],
            rating=rating,
            movie_id=movie_id,
            user_id=current_user_id
        )

        db.session.add(new_review)
        db.session.commit()

        return jsonify(new_review.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error al crear reseña: {str(e)}")
        return jsonify({"error": "Error al crear la reseña"}), 500

@jwt_required()
def delete_review(movie_id, review_id):
    """Elimina una reseña"""
    try:
        current_user_id = get_jwt_identity()
        review = Review.query.get(review_id)

        if not review:
            return jsonify({"error": "Reseña no encontrada"}), 404

        if review.user_id != current_user_id:
            return jsonify({"error": "No autorizado"}), 403

        if str(review.movie_id) != str(movie_id):
            return jsonify({"error": "ID de película no coincide"}), 400

        db.session.delete(review)
        db.session.commit()

        return jsonify({"message": "Reseña eliminada exitosamente"}), 200

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error al eliminar reseña: {str(e)}")
        return jsonify({"error": "Error al eliminar la reseña"}), 500 