import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MovieDetail.css';
import { config } from "../utils/config";
const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL_API = config.BACKEND_URL;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${URL_API}/movies/${id}`);
        if (!response.ok) {
          throw new Error('Película no encontrada');
        }
        const data = await response.json();
        console.log(data);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="loading-spinner">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return null;

  return (
    <div className="movie-detail-container">
      <div className="movie-backdrop" style={{ backgroundImage: `url(${movie.backdrop_path})` }}>
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="movie-content">
        <div className="movie-poster">
          <img src={movie.poster_path.large} alt={movie.title} />
        </div>
        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{movie.runtime} min</span>
            <span>{movie.rating}</span>
          </div>
          
          <div className="movie-overview">
            <h3>Sinopsis</h3>
            <p>{movie.overview}</p>
          </div>
          
          <div className="movie-cast">
            <h3>Reparto Principal</h3>
            <div className="cast-list">
              {movie.cast?.slice(0, 5).map(actor => (
                <div key={actor.id} className="cast-item">
                  <img src={actor.profile_path} alt={actor.name} />
                  <span>{actor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 