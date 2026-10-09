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
  static async getHorariosByFechasByCuaderno({
    idCuaderno,
    idEstablecimiento,
    fecha,
  }) {
    try {
      const response = await api.post(
        '/usuario/fichas-medicina-familiar/obtener-horarias-fecha-cuaderno',
        {
          idCuaderno,
          idEstablecimiento,
          fecha,
        },
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async reservarFicha({ payload }) {
    try {
      const response = await api.post(
        '/usuario/fichas-medicina-familiar/reservar-ficha',
        payload,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
  static async getFichaByFecha({ payload }) {
    try {
      const response = await api.post(
        '/usuario/fichas-medicina-familiar/obtener-ficha-por-fecha',
        payload,
      );
      return response.data;
    } catch (e) {
      return toServiceError(e);
    }
  }
}
