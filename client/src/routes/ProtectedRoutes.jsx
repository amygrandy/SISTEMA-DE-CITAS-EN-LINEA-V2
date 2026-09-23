import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { usuario, loading } = useAuth();
  const location = useLocation();

  // Mientras verificamos si la sesión sigue siendo válida
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Verificando sesión...</p>
      </div>
    );
  }

  // No existe usuario autenticado
  if (!usuario) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Usuario autenticado
  return <Outlet />;
}
