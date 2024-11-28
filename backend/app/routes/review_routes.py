from flask import Blueprint, request, jsonify
from app.utils.database import db

# Crear el Blueprint para reviews
bp = Blueprint("reviews", __name__, url_prefix="/reviews")

@bp.route('/reviews', methods=['GET'])
def get_reviews():
    return jsonify({"message": "Lista de reviews"})

@bp.route('/reviews', methods=['POST'])
def create_review():
    return jsonify({"message": "Review creada"})