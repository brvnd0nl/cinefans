import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Para alertas bonitas
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { config } from "../utils/config";
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const URL_API = config.BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${URL_API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en las credenciales');
      }

      // Login exitoso
      login(data.access_token, email);
      navigate('/index-movie'); // Redirige a pagina de inicio
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/registro'); // Navega al componente Registro
  };

  return (
    <div className="login-container_lg">
      <div className="login-form">
        <h2 className="login-h2">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-grouplg">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Introduce tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div style={{ height: '30px' }}></div> {/* Espaciador */}
          <div className="input-grouplg">
            <label htmlFor="password">Contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} />
            </button>
          </div>

          {/* Contenedor de los botones debajo del campo de contraseña */}
          <div className="input-grouplg">
            <button type="submit" className="btn-submit_s">
              Iniciar sesión
            </button>
            <button
              type="button" // Cambiado de submit a button
              className="btn-register_s"
              onClick={handleRegisterRedirect} // Redirige al registro
            >
              ¿No tienes cuenta? Crea una
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
