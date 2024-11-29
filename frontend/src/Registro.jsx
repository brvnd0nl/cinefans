import React, { useState } from "react";
import "./Registro.css"; // Importa los estilos

const Registro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username, 'Contraseña:', password, 'Email:', email);
  };

  return (
    <div className="registro_container">
        <div className="registro-form">
      <h2 className="title_h2">Crea tu cuenta y empieza a disfrutar</h2>
      <form onSubmit={handleSubmit} >
      <div className="input-groupr">
      <label htmlFor="username">Usuario</label>
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div style={{ height: '30px' }}></div> {/* Espaciador */}
        <div className="input-groupr">
        <label htmlFor="email">Correo Electronico</label>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div style={{ height: '30px' }}></div> {/* Espaciador */}
        <div className="input-groupr">
        <label htmlFor="password">Contraseña</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="contraseña"
          placeholder="Contraseña"
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
        <div style={{ height: '30px' }}></div> {/* Espaciador */}
        <div className="input-groupr">
        <button type="submit" className="button_registro">
          Comenzar
        </button>
       </div> 
      </form>
    </div>  
    </div>
  );
};

export default Registro;
