import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PermissionRoute({ permiso }) {
  const { usuario, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const esSuperAdmin = usuario.rol === 'super_admin';

  if (esSuperAdmin) {
    return <Outlet />;
  }

  const tienePermiso = usuario.permisos?.includes(permiso);

  if (!tienePermiso) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
