import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { config } from '../utils/config';
import { getValidImageUrl } from '../utils/helpers';
import defaultPoster from '../assets/default-movie-poster.jpg';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const AP_URL = config.BACKEND_URL;

  // Debounce la función de búsqueda
  const debouncedSearch = useRef(
    debounce(async (term) => {
      if (term.length < 2) {
        setSuggestions([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${AP_URL}/movies/search?query=${encodeURIComponent(term)}&limit=5`
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La respuesta no es un JSON válido");
        }

        const data = await response.json();

        // Validar la estructura de los datos
        if (!Array.isArray(data.results)) {
          throw new Error("Formato de respuesta inválido");
        }

        // Procesar y validar cada película
        const validatedResults = data.results.map(movie => ({
          id: movie.id,
          title: movie.title || 'Título no disponible',
          poster_path: getValidImageUrl(movie.poster_path),
          release_date: movie.release_date || null,
          overview: movie.overview || 'No hay descripción disponible'
        }));

        setSuggestions(validatedResults);
      } catch (error) {
        console.error('Error en la búsqueda:', error);
        setError('No se pudieron cargar las sugerencias');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300)
  ).current;

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
      setError(null);
    }
  };

  const handleSuggestionClick = (movieId) => {
    if (movieId) {
      navigate(`/movie/${movieId}`);
      setShowSuggestions(false);
      setSearchTerm('');
      setError(null);
    }
  };

  // Manejador de errores de imagen
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultPoster;
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Buscar películas..."
          className="search-input"
          onFocus={() => setShowSuggestions(true)}
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </form>

      {showSuggestions && (searchTerm.length > 1) && (
        <div className="suggestions-container">
          {isLoading ? (
            <div className="suggestion-loading">Buscando...</div>
          ) : error ? (
            <div className="suggestion-error">{error}</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((movie) => (
              <div
                key={movie.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(movie.id)}
              >
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  onError={handleImageError}
                  loading="lazy"
                  className="suggestion-image"
                />
                <div className="suggestion-info">
                  <div className="suggestion-title">{movie.title}</div>
                  <div className="suggestion-year">
                    {movie.release_date 
                      ? new Date(movie.release_date).getFullYear()
                      : 'Año no disponible'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-suggestions">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 