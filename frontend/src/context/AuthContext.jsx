import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('cf-token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('cf-token', newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('cf-token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Verificar token al cargar
    const token = localStorage.getItem('cf-token');
    if (token) {
      setIsAuthenticated(true);
      // Aquí podrías hacer una petición para obtener los datos del usuario
    }
    setLoading(false);
  }, []);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 