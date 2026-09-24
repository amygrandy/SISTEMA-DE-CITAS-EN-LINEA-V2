import { api } from '../../../services/api';
import { toServiceError } from '../../../services/error';

export class FamiliarServices {
  static async getSelect() {
    try {
      const response = await api.get('/usuario/asegurados/select');
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
