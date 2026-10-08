import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.admin';

export default function AdminRoute() {
  const { usuario, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (usuario?.rol === 'paciente') {
    return <Navigate to="/paciente" replace />;
  }

  return <Outlet />;
}
