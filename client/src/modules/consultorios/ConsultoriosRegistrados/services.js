import { api } from '../../../services/api';
import { toServiceError } from '../../../services/error';

export class ConsultorioServices {
  static async getAll() {
    try {
      const response = await api.get('/admin/consultorio');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getSelectEstablecimientos() {
    try {
      const response = await api.get('/admin/consultorio/establecimientos');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getSelectSiais({ establecimiento_id }) {
    try {
      const response = await api.get('/admin/consultorio/select-siais', {
        params: {
          establecimiento_id,
        },
      });
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getSelecTipoConsultorio() {
    try {
      const response = await api.get('/admin/consultorio/tipo-consultorio');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async create(payload) {
    try {
      const response = await api.post('/admin/consultorio', payload);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async changeTipoConsultorio({ id, payload }) {
    try {
      const response = await api.patch(`/admin/consultorio/${id}`, payload);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async changeStatus({ id }) {
    try {
      const response = await api.patch(
        `/admin/consultorio/cambiar-estado/${id}`,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getConfiguracionById({ id }) {
    try {
      const response = await api.get(`admin/consultorio/configuracion/${id}`);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async updateConfiguracionById({ id, payload }) {
    try {
      const response = await api.patch(
        `admin/consultorio/configuracion/${id}`,
        payload,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
