import { useState, useEffect } from "react";
import './MovieList.css';
import { Link } from "react-router-dom";

function MovieList() {

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          /*`https://api.themoviedb.org/3/discover/movie?api_key=9d89ed2d9eb9413c95cb080dc62d860d&with_genres=28&language=es-ES&page=1`*/
          `https://api.themoviedb.org/3/discover/movie?api_key=9d89ed2d9eb9413c95cb080dc62d860d&language=es-ES&page=1`
        );
        const data = await response.json();
        setMovie(data.results);
      } catch (error) {
        console.error("Error al obtener las películas de acción:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Todas las películas</h2>
      <ul class="movie-list">
        {movie.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList;