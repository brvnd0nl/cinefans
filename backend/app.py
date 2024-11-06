# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Esto permite todas las solicitudes de cualquier origen

@app.route('/movies', methods=['GET'])
def get_movies():
    # Lista estática de películas para la prueba
    movies = [
        {"id": 1, "title": "Inception", "year": 2010},
        {"id": 2, "title": "The Matrix", "year": 1999},
        {"id": 3, "title": "Interstellar", "year": 2014},
        {"id": 4, "title": "Parasite", "year": 2019},
        {"id": 5, "title": "The Godfather", "year": 1972},
    ]
    return jsonify(movies)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
