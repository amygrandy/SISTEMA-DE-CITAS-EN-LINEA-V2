import { ReporteRespository } from '../repository.js';
import {
  aumentarUnDia,
  formatearFechaQuitarGuines,
  formatearFechaDos,
  separarFechaHora,
} from '../../../../shared/services/funciones.js';

export class GetAllByEstablecimientoUseCase {
  static async execute({
    establecimiento_id,
    fecha_inicial,
    fecha_final,
    estado,
    tipo_cita,
  }) {
    let tipo_citaNorm;
    if (tipo_cita) {
      tipo_citaNorm = 'Web';
    } else {
      tipo_citaNorm = 'Generado desde sistema de Fichas';
    }
    const data = await ReporteRespository.getAllByEstablecimiento({
      establecimiento_id,
      estado,
      fecha_final: aumentarUnDia(fecha_final),
      fecha_inicial: formatearFechaQuitarGuines(fecha_inicial),
      tipo_cita: tipo_citaNorm,
    });

    return data?.map((row) => {
      const { fecha, hora } = separarFechaHora(row.fip_fecha_ini);
      return {
        ...row,
        fecha: formatearFechaDos(fecha),
        hora,
        fip_fecha_ini: undefined,
      };
    });
  }
}
