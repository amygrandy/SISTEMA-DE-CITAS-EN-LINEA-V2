import { cupoFichaModel } from '../../../models/cupoFichas.model.js';

export class CupoFichasRepository {
  static async findOrCreate({
    fecha,
    cuaderno_id,
    establecimiento_id,
    limite,
    transaction,
  }) {
    const [data] = await cupoFichaModel.findOrCreate({
      where: {
        fecha,
        cuaderno_id,
        establecimiento_id,
      },
      defaults: {
        limite,
        reservas: 0,
      },
      transaction,
    });
    return data.toJSON();
  }
}
