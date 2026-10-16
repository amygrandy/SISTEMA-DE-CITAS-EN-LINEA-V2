import { ReporteRespository } from '../repository.js';
import {
  aumentarUnDia,
  formatearFechaQuitarGuines,
  separarFechaHora,
  formatearFechaDos,
} from '../../../../shared/services/funciones.js';

export class getAllByConsultorioByMedicoUseCase {
  static async execute({
    establecimiento_id,
    consultorio_id,
    fecha_inicial,
    fecha_final,
    estado,
    tipo_cita,
  }) {
    const data = await ReporteRespository.getAllByConsultorioByMedico({
      consultorio_id,
      establecimiento_id,
      estado,
      fecha_final: aumentarUnDia(fecha_final),
      fecha_inicial: formatearFechaQuitarGuines(fecha_inicial),
      tipo_cita,
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
