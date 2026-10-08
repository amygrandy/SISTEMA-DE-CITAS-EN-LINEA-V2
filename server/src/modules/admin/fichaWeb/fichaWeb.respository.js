import { FichaWebModel } from '../../../models/fichaWeb.model.js';

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
}
