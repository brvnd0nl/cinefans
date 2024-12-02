import React from 'react';
import './Movie.css';

function Movie() {
  return (
    <div className="movie-details">
      <header className="movie-header">
        <img src="" alt="" />
        <h1>Pelicula 1</h1>
      </header>

      <section className="movie-info">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum dolores atque possimus expedita obcaecati officiis mollitia error ex earum sequi harum fugit necessitatibus, consequatur perspiciatis quasi eligendi asperiores consequuntur distinctio.</p>
        <div className="details">
          <p><strong>Director:</strong> Pepe</p>
          <p><strong>Elenco:</strong> Juan, Jaime</p>
          <p><strong>Género:</strong> Terror</p>
          <p><strong>Duración:</strong> 120 min</p>
        </div>
      </section>

      <section className="trailer">
        <h2>Tráiler</h2>
      </section>

      <section className="reviews">
        <h2>Reseñas</h2>
      </section>

      <section className="similar-movies">
        <h2>Películas Similares</h2>
        {/* Aquí puedes renderizar las películas similares */}
      </section>
    </div>
  );
}

export default Movie;