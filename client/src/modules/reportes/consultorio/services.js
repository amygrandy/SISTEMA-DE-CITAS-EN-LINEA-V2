import { api } from '../../../services/api';
import { toServiceError } from '../../../services/error';

export class EstablecimientoPage {
  static async getSelectEstablecimiento() {
    try {
      const response = await api.get('/admin/reportes/establecimiento');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getConsultorioByEstablecimiento({ id }) {
    try {
      const response = await api.get(`/admin/reportes/consultorio/${id}`);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getAllReporte({
    establecimiento_id,
    consultorio_id,
    fecha_inicial,
    fecha_final,
    estado,
    tipo_cita,
  }) {
    try {
      const response = await api.post('/admin/reportes/consultorio-medico', {
        establecimiento_id,
        consultorio_id,
        fecha_inicial,
        fecha_final,
        estado,
        tipo_cita,
      });
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
