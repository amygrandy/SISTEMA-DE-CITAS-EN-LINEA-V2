import { TipoConsultorioModel } from '../../../models/tipoConsultorio.model.js';

export class TipoConsultorioRepository {
  static async getAll() {
    const data = await TipoConsultorioModel.findAll();
    return data;
  }
  static async getId({ id, transaction = null }) {
    const data = await TipoConsultorioModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }
    return data;
  }
  static async create({ payload, transaction = null }) {
    const data = await TipoConsultorioModel.create(payload, { transaction });
    return data;
  }
  static async update({ id, payload, transaction = null }) {
    const data = await TipoConsultorioModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }
    await data.update(payload, { transaction });

    return data;
  }
  static async changeStatus({ id, transaction }) {
    const data = await TipoConsultorioModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }

    await data.update({ estado: !data.estado }, { transaction });

    return data;
  }
  static async getSelect() {
    const data = await TipoConsultorioModel.findAll({
      where: {
        estado: true,
      },
      attributes: [
        ['id', 'value'],
        ['nombre_tipo', 'label'],
      ],
    });
    return data;
  }
  static async getByName({ nombre_tipo, transaction = null }) {
    const data = await TipoConsultorioModel.findOne({
      where: {
        nombre_tipo,
      },
      transaction,
    });
    if (!data) {
      return null;
    }
    return data;
  }
}
