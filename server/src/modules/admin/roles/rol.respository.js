import { RolModel } from '../../../models/roles.model.js';
import { PermisoModel } from '../../../models/permisos.model.js';

class RolRepository {
  async getAll() {
    return RolModel.findAll({
      attributes: ['id', 'nombre_rol'],
      include: [
        {
          model: PermisoModel,
          as: 'permisos',
          attributes: ['nombre_permiso'],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }
  async findById(id, transaction = null) {
    return RolModel.findByPk(id, {
      attributes: ['nombre_rol'],
      include: [
        {
          model: PermisoModel,
          as: 'permisos',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
      ],
      transaction,
    });
  }
  async finByName(nombre_rol, transaction = null) {
    return RolModel.findOne({
      attributes: ['id', 'nombre_rol'],
      where: {
        nombre_rol,
      },
      transaction,
    });
  }
  async create(payload, transaction = null) {
    const data = await RolModel.create(payload, { transaction });
    return data;
  }
  async update(id, payload, transaction = nul) {
    const data = await RolModel.findByPk(id, {
      transaction,
    });
    if (!data) {
      return null;
    }
    return data.update(payload);
  }
  async getRolesForSelect(options = {}) {
    return RolModel.findAll(options);
  }
  async getPermisosForSelect() {
    return PermisoModel.findAll({
      attributes: [
        ['id', 'value'],
        ['nombre_permiso', 'label'],
      ],
    });
  }
  static async getRolWithPermisos({ id, transaction = null }) {
    const data = await RolModel.findByPk(id, {
      include: [
        {
          model: PermisoModel,
          as: 'permisos',
          attributes: ['codigo_permiso'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!data) {
      return null;
    }
    return data;
  }
}

export default RolRepository;
