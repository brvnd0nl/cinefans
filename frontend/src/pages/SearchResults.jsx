import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { config } from "../utils/config";
import MovieCard from '../components/MovieCard';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const URL_API = config.BACKEND_URL;

  const searchQuery = searchParams.get('q');

  const fetchMovies = async (pageNum) => {
    try {
      const response = await fetch(
        `${URL_API}/movies/search?query=${encodeURIComponent(searchQuery)}&page=${pageNum}`
      );
      if (!response.ok) throw new Error('Error en la búsqueda');
      
      const data = await response.json();
      
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      
      setHasMore(data.total_pages > pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setLoading(true);
    setError(null);
    fetchMovies(1);
  }, [searchQuery]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="search-results-container">
      <h2>Resultados para: {searchQuery}</h2>
      
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && <div className="loading-spinner">Cargando...</div>}
      
      {!loading && hasMore && (
        <button onClick={loadMore} className="load-more-button">
          Cargar más
        </button>
      )}
      
      {!loading && movies.length === 0 && (
        <div className="no-results">
          No se encontraron películas para "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default SearchResults; 