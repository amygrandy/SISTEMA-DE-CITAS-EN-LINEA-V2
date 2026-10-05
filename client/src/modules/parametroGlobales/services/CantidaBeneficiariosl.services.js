import { api } from '../../../services/api';
import { toServiceError } from '../../../services/error';

export class CantidadBeneficiariosServices {
  static async getById() {
    try {
      const response = await api.get('/admin/cantidad-beneficiarios');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async update({ payload }) {
    try {
      const response = await api.put('/admin/cantidad-beneficiarios', payload);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
