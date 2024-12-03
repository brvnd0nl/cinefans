import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importar Link para la navegación
import "../styles/Navbar.css";
import logo from "../assets/logo.png"; // Importa la imagen desde src
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar">
      <Link to="/"> 
        <div className="nav_logo">
          <img src={logo} alt="CINEFAN Logo" className="logo_image" />
        </div>
      </Link>
      <div className={`nav_items ${isOpen && "open"}`}>
        {/* Cambiamos la etiqueta a Link para la navegación */}
        <Link to="/index-movie"> INICIO </Link>
        <Link to={`/movie-list`}> PELICULAS </Link>
        <SearchBar />
        <div className="nav_user">
          {/* Usamos Link para redirigir a la página de login */}
          <Link to="/login">
            <i className="fas fa-user"></i> {/* Ícono de Font Awesome */}
          </Link>
        </div>
        <div className="nav_movie">
          {/* Usamos Link para redirigir a la página de login */}

        </div>
      </div>

      <div
        className={`nav_toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Navbar;
