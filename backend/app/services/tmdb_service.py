import requests
from flask import current_app

class TMDBService:
    @staticmethod
    def get_movie(movie_id):
        url = f"{current_app.config['TMDB_BASE_URL']}/movie/{movie_id}"
        params = {'api_key': current_app.config['TMDB_API_KEY']}
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        return None
    
    @staticmethod
    def search_movies(query, page=1):
        url = f"{current_app.config['TMDB_BASE_URL']}/search/movie"
        params = {
            'api_key': current_app.config['TMDB_API_KEY'],
            'query': query,
            'page': page
        }
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        return {'results': []}

    @staticmethod
    def get_popular_movies():
        url = f"{current_app.config['TMDB_BASE_URL']}/movie/popular"
        params = {'api_key': current_app.config['TMDB_API_KEY']}
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        return {'results': []}