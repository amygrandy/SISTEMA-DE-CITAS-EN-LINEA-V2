import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
  const { usuario, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario?.rol === 'paciente') {
    return <Navigate to="/paciente" replace />;
  }

  return <Outlet />;
}
