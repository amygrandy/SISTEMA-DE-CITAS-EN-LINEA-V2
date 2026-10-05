import { api } from '../../../../services/api';
import { toServiceError } from '../../../../services/error';

export class MedicianaFamiliarServices {
  static async getFechaHabilitadas({ idCuaderno, idEstablecimiento }) {
    try {
      const response = await api.post(
        'usuario/fichas-medicina-familiar/fechas-cuaderno',
        {
          idCuaderno,
          idEstablecimiento,
        },
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
