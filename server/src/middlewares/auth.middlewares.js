import jwt from 'jsonwebtoken';
import { DEFAULTS } from '../const/env.js';
import RolRepository from '../modules/admin/roles/rol.respository.js';
import AuthUsuarioRepository from '../modules/usuario/AuthUsuario/authUsuario.repository.js';

const rolRepository = new RolRepository();
const authUsuarioRepository = new AuthUsuarioRepository();

export const chechkAuthPaciente = async (req, res, next) => {
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

    const data = await authUsuarioRepository.getPaciente({
      matricula: decoded.matricula,
    });
    if (!data) {
      return res.status(401).json({
        ok: false,
        message: 'No se encontro al usuario',
      });
    }
    const rolPaciente = await rolRepository.finByName('paciente');

    req.usuario = { ...data, rol: rolPaciente.nombre_rol };
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
