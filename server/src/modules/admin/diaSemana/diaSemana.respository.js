import { Op } from 'sequelize';
import { diaSemanaModel } from '../../../models/diaSemana.model.js';

export class DiaSemanaRepository {
  static async getArrayById({ ids = [], transaction = null }) {
    const data = await diaSemanaModel.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      raw: true,
      transaction,
    });

    if (data.length !== ids.length) {
      return null;
    }
    return data;
  }
  static async getSelect() {
    const data = await diaSemanaModel.findAll({
      attributes: [
        ['id', 'value'],
        ['label', 'dia'],
      ],
    });

    return data;
  }
}
