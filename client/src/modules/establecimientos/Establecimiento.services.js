import { api } from '../../services/api.js';
import { toServiceError } from '../../services/error.js';

export class EstablecimientoServices {
  static async getAll() {
    try {
      const response = await api.get('/admin/establecimiento');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
