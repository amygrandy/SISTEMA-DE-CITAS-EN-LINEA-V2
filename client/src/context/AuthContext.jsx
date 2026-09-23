import { createContext, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificarSesion();
  }, []);

  // agregar al sistema
  const verificarSesion = async () => {
    const token = localStorage.getItem('token');

    // Si no existe token, simplemente es un usuario no autenticado
    if (!token) {
      setUsuario(null);
      setLoading(false);
      return;
    }
    try {
      const response = await api.get('/login-usuario/me');
      setUsuario(response.data.data);
    } catch (error) {
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (usuario) => {
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        loading,
        login,
        logout,
        verificarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return context;
}
