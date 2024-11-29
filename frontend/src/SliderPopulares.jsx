import { useState, useEffect } from "react";
import "./SliderPopulares.css";

const SliderPopulares = () => {
  const [images, setImages] = useState([]); // Estado para las imágenes
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=9d89ed2d9eb9413c95cb080dc62d860d&language=es-ES&page=1`
        );
        const data = await response.json();
        // Mapea la URL de las imágenes (asegurándote de usar el tamaño adecuado)
        const imageUrls = data.results.map(
          (movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        );
        setImages(imageUrls);
      } catch (error) {
        console.error("Error al obtener las películas populares:", error);
      }
    };

    fetchMovies();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 8) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 8 < 0 ? images.length - 8 : prevIndex - 8
    );
  };

  return (
    <div className="slider-populares">
      <h2>Películas Más Vistas</h2>

      <div className="small-slider-container">
        <button className="prev" onClick={prevSlide}>
          ‹
        </button>
        <div className="small-images-wrapper">
          {images.slice(currentIndex, currentIndex + 8).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Película ${index + 1}`}
              className="small-image"
            />
          ))}
        </div>
        <button className="next" onClick={nextSlide}>
          ›
        </button>
      </div>
    </div>
  );
};

export default SliderPopulares;
