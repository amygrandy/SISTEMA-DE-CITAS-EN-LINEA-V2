import { api } from '../../../../services/api';
import { toServiceError } from '../../../../services/error';

export class HistorialServices {
  static async getHistoria({ id }) {
    try {
      const response = await api.get(`/usuario/historial/${id}`);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
