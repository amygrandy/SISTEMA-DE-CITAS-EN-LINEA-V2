import { useAuth } from '../context/AuthContext';

export function usePermisos() {
  const { usuario } = useAuth();

  const esSuperAdmin = usuario?.nombre_rol === 'super_admin';

  const tienePermiso = (permiso) => {
    if (esSuperAdmin) {
      return true;
    }

    return usuario?.permisos?.includes(permiso) ?? false;
  };

  const tieneAlgunPermiso = (permisos = []) => {
    if (esSuperAdmin) {
      return true;
    }

    return permisos.some((permiso) => usuario?.permisos?.includes(permiso));
  };

  const tieneTodosPermisos = (permisos = []) => {
    if (esSuperAdmin) {
      return true;
    }

    return permisos.every((permiso) => usuario?.permisos?.includes(permiso));
  };

  return {
    usuario,
    esSuperAdmin,
    tienePermiso,
    tieneAlgunPermiso,
    tieneTodosPermisos,
  };
}
