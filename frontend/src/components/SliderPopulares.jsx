import { useState, useEffect } from "react";
import { config } from "../utils/config";
import "../styles/SliderPopulares.css";

const SliderPopulares = () => {
  const [images, setImages] = useState([]); // Estado para las imágenes
  const [currentIndex, setCurrentIndex] = useState(0);  

  useEffect(() => {
    const URL_API = config.TMDB_URL;
    const API_KEY = config.TMDB_API_KEY;

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${URL_API}movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
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
