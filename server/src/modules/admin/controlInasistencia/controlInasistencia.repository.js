import { SancionInasistenciaModel } from '../../../models/sancioInasistencia.model.js';

export class ControlInasistenciaRespository {
  static async getById({ id = 1, transaction = null } = {}) {
    const data = await SancionInasistenciaModel.findByPk(id, {
      attributes: ['cantidad_inasistencia', 'rango_dias', 'sancion_dias'],
      transaction,
    });
    if (!data) {
      return null;
    }
    return data;
  }
  static async update({ id = 1, payload, transaction = null }) {
    const data = await SancionInasistenciaModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }

    await data.update(payload, { transaction });
    return data;
  }
}
