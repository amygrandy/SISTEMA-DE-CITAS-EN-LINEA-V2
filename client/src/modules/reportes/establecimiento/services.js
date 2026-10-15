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
  static async getAllReporteEstablecimiento({
    establecimiento_id,
    fecha_inicial,
    fecha_final,
    estado,
    tipo_cita,
  }) {
    try {
      const response = await api.post(
        '/admin/reportes/establecimiento-reporte',
        {
          establecimiento_id,
          fecha_inicial,
          fecha_final,
          estado,
          tipo_cita,
        },
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
