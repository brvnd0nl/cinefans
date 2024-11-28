from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.tmdb_service import search_movies, get_top_rated_movies, get_popular_movies

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

@bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return {"message": "You have access"}, 200