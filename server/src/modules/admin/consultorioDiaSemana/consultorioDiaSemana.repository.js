import { Op } from 'sequelize';
import { consultorioDiaSemanaModel } from '../../../models/diaSemana.model.js';

export class ConsultorioDiaSemanaRepository {
  static async create({ payload, transaction = null }) {
    const data = consultorioDiaSemanaModel.create(payload, { transaction });
    return data;
  }
  static async createByArray({ payload = [], transaction = null }) {
    const data = await consultorioDiaSemanaModel.bulkCreate(payload, {
      transaction,
    });
    return data;
  }
  static async getCambios({
    consultorio_id,
    dias_id = [],
    transaction = null,
  }) {
    const dataOld = await consultorioDiaSemanaModel.findAll({
      attributes: ['id', 'consultorio_id', 'dia_semana_id'],
      where: {
        consultorio_id,
      },
      transaction,
      raw: true,
    });

    const dataSetOld = new Set(dataOld.map((row) => row.dia_semana_id));
    const dataSetNew = new Set(dias_id);

    // IDs que están en dias_id pero NO en dataOld (para insertar)
    const dataAdd = [...dataSetNew].filter((id) => !dataSetOld.has(id));

    // IDs que están en dataOld pero NO en dias_id (para eliminar)
    const dataRemove = [...dataSetOld].filter((id) => !dataSetNew.has(id));

    return { dataAdd, dataRemove };
  }
  static async eliminarByArray({
    consultorio_id,
    dias_id = [],
    transaction = null,
  }) {
    const data = await consultorioDiaSemanaModel.destroy({
      where: {
        consultorio_id,
        dia_semana_id: {
          [Op.in]: dias_id,
        },
      },
      transaction,
    });

    if (data == 0) {
      return null;
    }

    return data;
  }
}
