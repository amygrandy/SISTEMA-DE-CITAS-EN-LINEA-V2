import { api } from '../../../services/api';
import { toServiceError } from '../../../services/error';

export class ZonificacionServices {
  static async getAll() {
    try {
      const response = await api.get('/admin/zonificacion');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getSelectEstablecimiento() {
    try {
      const response = await api.get(`/admin/zonificacion/establecimiento`);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getSelectConsultoriosByEstablecimiento({ establecimiento_id }) {
    try {
      const response = await api.get(
        `/admin/zonificacion/consultorio/${establecimiento_id}`,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getId({ id }) {
    try {
      const response = await api.get(`/admin/zonificacion/${id}`);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async create({ payload }) {
    try {
      const response = await api.post('/admin/zonificacion', payload);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async update({ id, payload }) {
    try {
      const response = await api.patch(`/admin/zonificacion/${id}`, payload);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
