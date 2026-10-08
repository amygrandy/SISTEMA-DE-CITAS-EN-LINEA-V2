import { cupoFichaModel } from '../../../models/cupoFichas.model.js';
import { Op } from 'sequelize';
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

  static async actualizarLimiteDesdeManana({
    limite,
    cuadernoId,
    establecimientoId,
  }) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate());

    const fechaManana = [
      fecha.getFullYear(),
      String(fecha.getMonth() + 1).padStart(2, '0'),
      String(fecha.getDate()).padStart(2, '0'),
    ].join('-');

    const [affectedRows] = await cupoFichaModel.update(
      {
        limite,
      },
      {
        where: {
          fecha: {
            [Op.gte]: fechaManana,
          },
          cuaderno_id: cuadernoId,
          establecimiento_id: establecimientoId,
        },
      },
    );

    return affectedRows;
  }
}
