import { AuthAdminRespository } from './authAdmin.respository.js';
import { generateToken } from '../../../shared/services/JwtService.js';
import RolRepository from '../roles/rol.respository.js';
import bcrypt from 'bcrypt';

export class LoginUseCase {
  static async execute({ payload }) {
    const { nombre_usuario, contrasenia } = payload;
    const data = await AuthAdminRespository.getUsuario({ nombre_usuario });
    if (!data) {
      const err = new Error('Credenciales incorrectas');
      err.statusCode = 404;
      throw err;
    }
    const isMatch = await bcrypt.compare(contrasenia, data.contrasenia);
    if (!isMatch) {
      const err = new Error('Credenciales incorrectas');
      err.statusCode = 404;
      throw err;
    }
    const buscarRolesWithPermisos = await RolRepository.getRolWithPermisos({
      id: data.rol_id,
    });
    if (!buscarRolesWithPermisos) {
      const err = new Error('No tiene un rol asignado');
      err.statusCode = 404;
      throw err;
    }
    const token = generateToken({ id: data.id });
    const dataUser = {
      ...data,
      contrasenia: undefined,
      estado: undefined,
      rol_id: undefined,
      id: undefined,
    };
    return {
      usuario: {
        ...dataUser,
        rol: buscarRolesWithPermisos.nombre_rol,
        permisos: buscarRolesWithPermisos.permisos.map(
          (row) => row.codigo_permiso,
        ),
      },
      token,
    };
  }
}
