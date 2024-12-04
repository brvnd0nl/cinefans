import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/MovieDetail.css';
import { config } from "../utils/config";
const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewError, setReviewError] = useState(null);
  const URL_API = config.BACKEND_URL;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${URL_API}/movies/${id}`);
        if (!response.ok) {
          throw new Error('Película no encontrada');
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${URL_API}/movies/${id}/reviews`);
        if (!response.ok) throw new Error('Error al cargar reseñas');
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (err) {
        setReviewError(err.message);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL_API}/movies/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newReview,
          rating: rating
        })
      });

      if (!response.ok) throw new Error('Error al enviar la reseña');
      
      // Actualizar la lista de reseñas
      const updatedMovie = await response.json();
      setMovie(prev => ({
        ...prev,
        reviews: updatedMovie.reviews
      }));
      
      // Limpiar el formulario
      setNewReview('');
      setRating(5);
    } catch (err) {
      console.error('Error:', err);
    }
  };

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
            <span>{movie.vote_average.toFixed(1)} ⭐</span>
          </div>
          
          {movie.videos && movie.videos.length > 0 && (
            <div className="movie-trailer">
              <h3>Trailer</h3>
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${movie.videos[0].key}`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          
          <div className="movie-overview">
            <h3>Sinopsis</h3>
            <p>{movie.overview}</p>
          </div>
          
          <div className="movie-reviews">
            <h3>Reseñas</h3>
            
            {isAuthenticated && (
              <form onSubmit={handleReviewSubmit} className="review-form">
                <div className="rating-input">
                  <label>Calificación:</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num} ⭐</option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Escribe tu reseña..."
                  required
                />
                <button type="submit">Publicar reseña</button>
              </form>
            )}
            
            <div className="reviews-list">
              {loadingReviews ? (
                <div className="loading">Cargando reseñas...</div>
              ) : reviewError ? (
                <div className="error">{reviewError}</div>
              ) : reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="review-author">{review.user.username}</span>
                      <span className="review-rating">{review.rating} ⭐</span>
                      {review.source && (
                        <span className="review-source">{review.source}</span>
                      )}
                    </div>
                    <p className="review-content">{review.content}</p>
                    <span className="review-date">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-reviews">No hay reseñas aún. ¡Sé el primero en opinar!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 