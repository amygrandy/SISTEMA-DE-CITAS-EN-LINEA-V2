import { api } from '../../../services/api';
import { toServiceError } from '../../../services/error';

export class ControlInasistencia {
  static async getById() {
    try {
      const response = await api.get('/admin/control-inasistencia');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async update({ payload }) {
    try {
      const response = await api.put('/admin/control-inasistencia', payload);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
