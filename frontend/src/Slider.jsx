import { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
  const images = [
    "./src/assets/image1.jpg", 
    "./src/assets/image2.jpg", 
    "../src/assets/image3.jpg", 
    "./src/assets/image4.jpg", 
    "./src/assets/image5.jpg", 
    "./src/assets/image6.jpg"
  ];  // Rutas de las imágenes

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(images.length - 1); // Mantener el índice anterior
  const [startX, setStartX] = useState(0); // Posición inicial del mouse

  // Función para ir a la siguiente imagen
  const nextSlide = () => {
    setPrevIndex(currentIndex); // Guarda el índice actual antes de cambiar
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cambia a la siguiente imagen
  };

  // Función para ir a la imagen anterior
  const prevSlide = () => {
    setPrevIndex(currentIndex); // Guarda el índice actual antes de cambiar
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Detecta el movimiento del mouse
  const handleMouseMove = (e) => {
    if (startX === 0) return; // No hacer nada si no se ha iniciado el arrastre

    const moveX = e.clientX - startX; // Medir el desplazamiento horizontal
    if (moveX > 100) {
      nextSlide(); // Si se mueve a la derecha, cambiar a la siguiente imagen
      setStartX(0); // Resetear el punto de inicio
    } else if (moveX < -100) {
      prevSlide(); // Si se mueve a la izquierda, cambiar a la imagen anterior
      setStartX(0); // Resetear el punto de inicio
    }
  };

  // Registra la posición inicial del mouse cuando se hace clic
  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };

  // Resetea el seguimiento del movimiento cuando el mouse se suelta
  const handleMouseUp = () => {
    setStartX(0);
  };

  // Función para cambiar la imagen al hacer clic en los "dots"
  const goToSlide = (index) => {
    setPrevIndex(currentIndex); // Guarda el índice actual antes de cambiar
    setCurrentIndex(index);
  };

  // Cambiar la imagen automáticamente cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000); // Cambiar cada 5000 ms (5 segundos)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [currentIndex]); // El useEffect depende del currentIndex

  return (
    <div 
      className="slider"
      onMouseDown={handleMouseDown} // Detectar cuando comienza el arrastre
      onMouseMove={handleMouseMove} // Detectar el movimiento del mouse
      onMouseUp={handleMouseUp} // Detectar cuando se suelta el mouse
      onMouseLeave={handleMouseUp} // Detectar cuando el mouse sale de la imagen
    >
      <div className="slider-container">
        <img
          src={images[prevIndex]}  // Muestra la imagen anterior con la animación
          alt={`Slide ${prevIndex + 1}`}
          className="slider-image prev-image"  // Clase para la imagen anterior
        />
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slider-image current-image"  // Clase para la imagen actual
        />
      </div>

      <button className="prev" onClick={prevSlide}>‹</button>
      <button className="next" onClick={nextSlide}>›</button>

      {/* Dots de navegación */}
      <div className="dots-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)} // Cambiar a la imagen correspondiente
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
