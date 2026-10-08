import { UsuarioModel } from '../../../models/usuario.model.js';

export class AuthAdminRespository {
  static async getUsuario({ nombre_usuario }) {
    const data = await UsuarioModel.findOne({
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      where: {
        nombre_usuario,
      },
      raw: true,
    });
    if (!data) {
      return null;
    }
    return data;
  }
  static async getById({ id }) {
    const data = await UsuarioModel.findByPk(id, {
      attributes: { exclude: ['updatedAt', 'createdAt'] },

      raw: true,
    });
    if (!data) {
      return null;
    }
    return data;
  }
}
