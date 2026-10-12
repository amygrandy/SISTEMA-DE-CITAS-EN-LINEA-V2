import { FichaEliminadaModel } from '../../../models/FichasEliminadas.model.js';

export class FichasEliminadasRepository {
  static async create({ payload, transaction = null }) {
    const data = await FichaEliminadaModel.create(payload, transaction);
    return data;
  }
}
