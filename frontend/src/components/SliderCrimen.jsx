import { useState, useEffect } from "react";
import { config } from "../utils/config";
import "../styles/SliderCrimen.css";

const SliderCrimen = () => {
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto para obtener las películas de crimen desde la API
  useEffect(() => {


    const URL_API = config.TMDB_URL;
    const API_KEY = config.TMDB_API_KEY;

    const fetchCrimeMovies = async () => {
      try {
        // URL modificada para obtener películas de crimen (with_genres=80)
        const response = await fetch(
          `${URL_API}discover/movie?api_key=${API_KEY}&with_genres=80&language=es-ES&page=1`
        );
        const data = await response.json();
        // Mapeamos las imágenes de las películas
        const imageUrls = data.results.map(
          (movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        );
        setImages(imageUrls); // Guardamos las imágenes en el estado
      } catch (error) {
        console.error("Error al obtener las películas de crimen:", error);
      }
    };

    fetchCrimeMovies(); // Llamamos a la función para obtener las películas
  }, []); // Solo se ejecuta al cargar el componente

  // Función para ir a la siguiente "página" de imágenes
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 8) % images.length);
  };

  // Función para ir a la anterior "página" de imágenes
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 8 < 0 ? images.length - 8 : prevIndex - 8
    );
  };

  return (
    <div className="slider-crimen">
      <h2>Películas de Crimen</h2>

      {/* Contenedor del carrusel */}
      <div className="small-slider-container">
        <button className="prev" onClick={prevSlide}>
          ‹
        </button>
        <div className="small-images-wrapper">
          {/* Mostramos las imágenes de las películas */}
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

export default SliderCrimen;
