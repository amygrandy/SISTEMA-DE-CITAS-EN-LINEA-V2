import { api } from '../../../services/api';
import { toServiceError } from '../../../services/error';

export class HorarioHabilitacionServices {
  static async getById() {
    try {
      const response = await api.get('/admin/horario-habilitacion');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async update({ payload }) {
    try {
      const response = await api.put('/admin/horario-habilitacion', payload);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
