import { CantidadBeneficiariosModel } from '../../../models/cantidadBeneficiarios.model.js';

export class CantidadBeneficiariosRepository {
  static async getById({ id = 1, transaction = null } = {}) {
    const data = await CantidadBeneficiariosModel.findByPk(id, {
      attributes: ['cantidad_ficha_por_asgurado'],
      transaction,
      raw: true,
    });
    if (!data) {
      return null;
    }
    return data;
  }
  static async update({ id = 1, payload, transaction = null }) {
    const data = await CantidadBeneficiariosModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }
    await data.update(payload, { transaction });
    return data;
  }
}
