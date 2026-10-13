import { api } from '../../../../../services/api';
import { toServiceError } from '../../../../../services/error';

export class EspecialidadServices {
  static async getTiposEspecialidad() {
    try {
      const response = await api.get('/usuario/especialidades/tipos');

      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getConsultorioByTipoByEstablecimiento({
    tipo_consultorio_id,
    establecimiento_id,
  }) {
    try {
      const response = await api.post('/usuario/especialidades/consultorios', {
        establecimiento_id,
        tipo_consultorio_id,
      });

      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
