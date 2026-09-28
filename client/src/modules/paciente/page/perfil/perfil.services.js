import { api } from '../../../../services/api';
import { toServiceError } from '../../../../services/error';

export class PerfilService {
  static async getPerfilAsegurado() {
    try {
      const response = await api.get('/usuario/perfil/asegurado');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
