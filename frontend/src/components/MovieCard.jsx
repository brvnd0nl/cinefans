import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-card-poster">
        {movie.poster_path ? (
          <img
            src={movie.poster_path.medium}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">
            <i className="fas fa-film"></i>
          </div>
        )}
        <div className="movie-card-overlay">
          <span className="view-details">Ver detalles</span>
        </div>
      </div>
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-info">
          <span className="movie-card-year">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </span>
          {movie.vote_average && (
            <span className="movie-card-rating">
              <i className="fas fa-star"></i>
              {movie.vote_average.toFixed(1)}
            </span>
          )}
        </div>
        <p className="movie-card-overview">
          {movie.overview ? (
            movie.overview.length > 150 
              ? `${movie.overview.substring(0, 150)}...` 
              : movie.overview
          ) : 'No hay descripción disponible.'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard; 