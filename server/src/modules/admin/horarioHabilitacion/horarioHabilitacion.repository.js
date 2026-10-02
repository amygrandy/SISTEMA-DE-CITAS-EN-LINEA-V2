import { horarioHabilitacionModel } from '../../../models/horarioHabilitacion.model.js';

export class HorarioHabilitacionRespository {
  static async update({ id, payload, transaction = null }) {
    const data = await horarioHabilitacionModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }

    await data.update(payload, { transaction });

    return data;
  }
  static async getAll() {
    const data = await horarioHabilitacionModel.findAll();

    return data;
  }
}
