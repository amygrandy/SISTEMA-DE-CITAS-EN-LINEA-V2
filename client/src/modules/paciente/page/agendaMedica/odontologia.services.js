import { api } from '../../../../services/api';
import { toServiceError } from '../../../../services/error';

export class OdontologiaServices {
  static async getConsultorioOdontologia({ id }) {
    try {
      const response = await api.get(`/usuario/buscar-odontologia/${id}`);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
