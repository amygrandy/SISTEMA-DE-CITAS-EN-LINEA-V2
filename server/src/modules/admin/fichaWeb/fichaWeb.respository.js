import { FichaWebModel } from '../../../models/fichaWeb.model.js';
import { Op } from 'sequelize';

export class FichaWebRepository {
  static async getCantidadFichasByAsegurado({ fecha, codigo_asegurado }) {
    const data = await FichaWebModel.count({
      where: {
        fecha,
        codigo_asegurado,
        estado: {
          [Op.in]: ['PENDIENTE', 'CONFIRMADA'],
        },
      },
    });
    return data;
  }
  static async removeFichaWeb({ id, transaction = null }) {
    const data = await FichaWebModel.findOne({
      where: {
        idfichaprogramada: id,
      },
      transaction,
    });
    if (!data) {
      return null;
    }
    await data.destroy({ transaction });

    return data;
  }
}
