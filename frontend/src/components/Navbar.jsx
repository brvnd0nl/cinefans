import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          ) : (
            <Link to="/login">
              <i className="fas fa-user"></i> {/* Ícono de Font Awesome */}
            </Link>
          )}
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
