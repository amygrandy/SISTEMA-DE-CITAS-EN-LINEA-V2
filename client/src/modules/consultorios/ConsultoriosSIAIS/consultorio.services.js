import { api } from '../../../services/api';
import { toServiceError } from '../../../services/error';

export class ConsultorioServices {
  static async getAllSIAIS() {
    try {
      const response = await api.get('/admin/consultorio/SIAIS');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
