import os
import requests
from dotenv import load_dotenv
from flask import current_app

load_dotenv()

TMDB_API_KEY = os.getenv('TMDB_API_KEY')
BASE_URL = "https://api.themoviedb.org/3"
IMAGE_BASE_URL = "https://image.tmdb.org/t/p"
LANGUAGE = "es-CO"
IMAGE_SIZES = {
    "little": "w185",
    "small": "w500",
    "medium": "w780",
    "large": "original"
}

def process_image_urls(data):
    """
    Procesa recursivamente el JSON y modifica las URLs de imágenes para incluir
    diferentes tamaños
    """
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, str) and value.startswith('/') and value.endswith(('.jpg', '.jpeg', '.png')):
                data[key] = {
                    "little": f"{IMAGE_BASE_URL}/{IMAGE_SIZES['little']}{value}",
                    "small": f"{IMAGE_BASE_URL}/{IMAGE_SIZES['small']}{value}",
                    "medium": f"{IMAGE_BASE_URL}/{IMAGE_SIZES['medium']}{value}",
                    "large": f"{IMAGE_BASE_URL}/{IMAGE_SIZES['large']}{value}"
                }
            elif isinstance(value, (dict, list)):
                process_image_urls(value)
    elif isinstance(data, list):
        for item in data:
            process_image_urls(item)
    return data

def search_movies(query):
    """
    Busca películas en TMDB
    """
    url = f"{BASE_URL}/search/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "language": LANGUAGE,
        "query": query
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        # Procesar las URLs de imágenes
        return process_image_urls(data)
    except requests.RequestException as e:
        return {"error": str(e)}, 500

def get_top_rated_movies(page=1):
    """
    Obtiene las películas mejor valoradas de TMDB
    """
    url = f"{BASE_URL}/movie/top_rated"
    params = {
        "api_key": TMDB_API_KEY,
        "language": LANGUAGE,
        "page": page
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        # Procesar las URLs de imágenes
        return process_image_urls(data)
    except requests.RequestException as e:
        return {"error": str(e)}, 500

def get_popular_movies(page=1):
    """
    Obtiene las películas populares de TMDB
    """
    url = f"{BASE_URL}/movie/popular"
    params = {
        "api_key": TMDB_API_KEY,
        "language": LANGUAGE,
        "page": page
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        # Procesar las URLs de imágenes
        return process_image_urls(data)
    except requests.RequestException as e:
        return {"error": str(e)}, 500

def get_movie_details(movie_id):
    """
    Obtiene los detalles completos de una película específica, incluyendo:
    - Información básica
    - Créditos (cast y crew)
    - Videos (trailers)
    - Imágenes
    - Recomendaciones
    """
    if not movie_id:
        return {"error": "ID de película no proporcionado"}, 400

    # Construir URLs para las diferentes peticiones
    movie_url = f"{BASE_URL}/movie/{movie_id}"
    credits_url = f"{movie_url}/credits"
    videos_url = f"{movie_url}/videos"
    images_url = f"{movie_url}/images"
    recommendations_url = f"{movie_url}/recommendations"

    # Parámetros comunes para todas las peticiones
    params = {
        "api_key": TMDB_API_KEY,
        "language": LANGUAGE
    }

    try:
        # Realizar todas las peticiones
        movie_response = requests.get(movie_url, params=params)
        movie_response.raise_for_status()
        movie_data = movie_response.json()

        # Obtener créditos
        credits_response = requests.get(credits_url, params=params)
        credits_response.raise_for_status()
        credits_data = credits_response.json()

        # Obtener videos (con fallback a inglés si no hay en español)
        videos_response = requests.get(videos_url, params=params)
        videos_response.raise_for_status()
        videos_data = videos_response.json()

        if not videos_data.get('results'):
            # Si no hay videos en español, intentar en inglés
            params_en = params.copy()
            params_en['language'] = 'en-US'
            videos_response = requests.get(videos_url, params=params_en)
            videos_response.raise_for_status()
            videos_data = videos_response.json()

        # Obtener imágenes (sin filtro de idioma para obtener todas)
        images_params = params.copy()
        images_params['include_image_language'] = 'null'
        images_response = requests.get(images_url, params=images_params)
        images_response.raise_for_status()
        images_data = images_response.json()

        # Obtener recomendaciones
        recommendations_response = requests.get(recommendations_url, params=params)
        recommendations_response.raise_for_status()
        recommendations_data = recommendations_response.json()

        # Construir respuesta completa
        detailed_response = {
            **movie_data,  # Información básica de la película
            "credits": {
                "cast": credits_data.get("cast", [])[:10],  # Limitar a 10 actores
                "crew": [
                    person for person in credits_data.get("crew", [])
                    if person.get("job") in ["Director", "Producer", "Screenplay"]
                ][:5]  # Limitar a 5 miembros del crew principales
            },
            "videos": [
                video for video in videos_data.get("results", [])
                if video.get("type") in ["Trailer", "Teaser"]
            ][:3],  # Limitar a 3 videos principales
            "images": {
                "backdrops": images_data.get("backdrops", [])[:5],  # Limitar a 5 backdrops
                "posters": images_data.get("posters", [])[:5]  # Limitar a 5 posters
            },
            "recommendations": recommendations_data.get("results", [])[:6]  # Limitar a 6 recomendaciones
        }

        # Procesar todas las URLs de imágenes en la respuesta
        return process_image_urls(detailed_response)

    except requests.RequestException as e:
        current_app.logger.error(f"Error fetching movie details: {str(e)}")
        return {"error": f"Error al obtener detalles de la película: {str(e)}"}, 500