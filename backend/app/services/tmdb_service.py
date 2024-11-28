import os
import requests
from dotenv import load_dotenv
from flask import current_app

load_dotenv()

TMDB_API_KEY = os.getenv('TMDB_API_KEY')
BASE_URL = "https://api.themoviedb.org/3"
IMAGE_BASE_URL = "https://image.tmdb.org/t/p"
IMAGE_SIZES = {
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
        "language": "es-MX",
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
        "language": "es-MX",
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
        "language": "es-MX",
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