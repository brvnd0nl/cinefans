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
                <section className="movie-banner" style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
                  <div className='movie-information'>
                    <h2>{movie.title}</h2>
                    <p>Fecha de estreno: <span>{movie.release_date}</span></p>
                    <p>Género: <span>{movie.genres.map((genre) => genre.name).join(', ')}</span></p>
                    <p>Duración: <span>{movie.runtime} minutos</span></p>
                    <p>{movie.overview}</p>
                  </div>
                </section>
                <section className='movie-cast'>

                </section>
                </>
              )}
    </div>
  );
}

export default Movie;