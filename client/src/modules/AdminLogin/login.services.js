import { api } from '../../services/api';
import { toServiceError } from '../../services/error';

export class LoginServices {
  static async InicioSesion({ payload }) {
    try {
      const response = await api.post('/login-admin', payload);
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
