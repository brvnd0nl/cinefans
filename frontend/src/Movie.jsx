import './Movie.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Movie() {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9d89ed2d9eb9413c95cb080dc62d860d&language=es-ES`); 1    
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error al obtener la película:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div className="movie-details">
            {movie && (
                <>
                  <h2>{movie.title}</h2>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <p>Fecha de estreno: {movie.release_date}</p>
                  <p>Resumen: {movie.overview}</p>
                  <p>Género: {movie.genres.map((genre) => genre.name).join(', ')}</p>
                  <p>Duración: {movie.runtime} minutos</p>
                </>
              )}
    </div>
  );
}

export default Movie;