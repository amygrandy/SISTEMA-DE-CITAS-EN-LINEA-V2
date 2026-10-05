import { HorarioHabilitacionModel } from '../../../models/horarioHabilitacion.model.js';

export class HorarioHabilitacionRespository {
  static async getById({ id = 1, transaction = null } = {}) {
    const data = await HorarioHabilitacionModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
      transaction,
    });
    return data;
  }
  static async update({ id = 1, payload, transaction = null }) {
    const data = await HorarioHabilitacionModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }
    await data.update(payload, { transaction });
    return data;
  }
}
