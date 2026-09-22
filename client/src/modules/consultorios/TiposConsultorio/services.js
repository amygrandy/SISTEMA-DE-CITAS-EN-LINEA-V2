import { api } from '../../../services/api';
import { toServiceError } from '../../../services/error';

export class TipoConsultorioServices {
  static async getAll() {
    try {
      const response = await api.get('/admin/tipo-consultorio/');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async create(payload) {
    try {
      const response = await api.post('/admin/tipo-consultorio/', payload);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async update({ id, payload }) {
    try {
      const response = await api.patch(
        `/admin/tipo-consultorio/${id}`,
        payload,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async changeStatus({ id }) {
    try {
      console.log('*****');
      console.log(id);
      console.log('*****');

      const response = await api.patch(
        `/admin/tipo-consultorio/cambiar-estado/${id}`,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
