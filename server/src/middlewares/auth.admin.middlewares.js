import jwt from 'jsonwebtoken';
import { DEFAULTS } from '../const/env.js';
import RolRepository from '../modules/admin/roles/rol.respository.js';
import { AuthAdminRespository } from '../modules/admin/authAdmin/authAdmin.respository.js';

export const chechkAuthAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        ok: false,
        code: 'NoAutorizado',
        message: 'No autorizado',
      });
    }
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, DEFAULTS.JWT_SECRET);

    const data = await AuthAdminRespository.getById({
      id: decoded.id,
    });
    if (!data) {
      return res.status(401).json({
        ok: false,
        message: 'No se encontro al usuario',
      });
    }
    const buscarRolesWithPermisos = await RolRepository.getRolWithPermisos({
      id: data.rol_id,
    });
    if (!buscarRolesWithPermisos) {
      const err = new Error('No tiene un rol asignado');
      err.statusCode = 404;
      throw err;
    }
    const dataUser = {
      ...data,
      contrasenia: undefined,
      rol: buscarRolesWithPermisos.nombre_rol,
      permisos: buscarRolesWithPermisos.permisos.map(
        (row) => row.codigo_permiso,
      ),
    };

    req.usuario = dataUser;
    next();
  } catch (e) {
    console.log(e);
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({
        ok: false,
        code: 'TokenExpiredError',
        message: 'Token expirado',
      });
    }

    return res.status(401).json({
      ok: false,
      code: 'TokenInvalido',
      message: 'Token inválido',
    });
  }
};
