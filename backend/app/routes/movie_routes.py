from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.tmdb_service import search_movies, get_top_rated_movies, get_popular_movies, get_movie_details
from app.controllers.review_controller import get_movie_reviews, create_review, delete_review

bp = Blueprint("movies", __name__, url_prefix="/movies")

@bp.route("/search", methods=["GET"])
def search():
    query = request.args.get("query")
    if not query:
        return jsonify(error="Query parameter is required"), 400
    results = search_movies(query)
    return jsonify(results)

@bp.route("/top-rated", methods=["GET"])
def top_rated():
    page = request.args.get("page", 1, type=int)
    results = get_top_rated_movies(page)
    return jsonify(results)

@bp.route("/popular", methods=["GET"])
def popular():
    page = request.args.get("page", 1, type=int)
    results = get_popular_movies(page)
    return jsonify(results)

@bp.route('/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    movie_data = get_movie_details(movie_id)
    if isinstance(movie_data, tuple):  # Es un error
        return jsonify(movie_data[0]), movie_data[1]
    return jsonify(movie_data)

@bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return {"message": "You have access"}, 200

@bp.route('/<int:movie_id>/reviews', methods=['GET'])
def movie_reviews(movie_id):
    return get_movie_reviews(movie_id)

@bp.route('/<int:movie_id>/reviews', methods=['POST'])
@jwt_required()
def add_review(movie_id):
    return create_review(movie_id)

@bp.route('/<int:movie_id>/reviews/<int:review_id>', methods=['DELETE'])
@jwt_required()
def remove_review(movie_id, review_id):
    return delete_review(movie_id, review_id)