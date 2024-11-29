import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username, 'Contraseña:', password);
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
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              placeholder="Introduce tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
