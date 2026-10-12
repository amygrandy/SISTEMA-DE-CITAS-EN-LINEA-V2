import { FichasMedicinaFalimiarRepository } from '../FichasMedicinaFamiliar.repository.js';
import { ConsultorioRepository } from '../../../admin/consultorio/consultorio.repository.js';
import { EstablecimientoRepository } from '../../../admin/establecimiento/establecimiento.respository.js';
import {
  sumarDias,
  obtenerFechasHabilitadas,
} from '../../../../shared/services/funciones.js';

const meses = {
  '01': 'ENE',
  '02': 'FEB',
  '03': 'MAR',
  '04': 'ABR',
  '05': 'MAY',
  '06': 'JUN',
  '07': 'JUL',
  '08': 'AGO',
  '09': 'SEP',
  10: 'OCT',
  11: 'NOV',
  12: 'DIC',
};

const diasSemana = {
  LUNES: 'LUN',
  MARTES: 'MAR',
  MIERCOLES: 'MIÉ',
  JUEVES: 'JUE',
  VIERNES: 'VIE',
  SABADO: 'SÁB',
  DOMINGO: 'DOM',
};

export class GetFechasByCuadernoUseCase {
  static async execute({ payload }) {
    const { idCuaderno, idEstablecimiento } = payload;

    const buscarCuaderno = await ConsultorioRepository.getById({
      id: idCuaderno,
    });
    if (!buscarCuaderno) {
      const err = new Error('No se encontro el cuaderno');
      err.statusCode = 404;
      throw err;
    }
    const buscarEstablecimiento = await EstablecimientoRepository.getById({
      id: idEstablecimiento,
    });
    if (!buscarEstablecimiento) {
      const err = new Error('No se encontro el establecimeinto');
      err.statusCode = 404;
      throw err;
    }

    const hoy = sumarDias(0);

    const DiasAnticipacion = buscarCuaderno.dias_anticipacion;
    const dias = buscarCuaderno.dias;

    const fechasHabilitados = obtenerFechasHabilitadas({
      anticipacionDias: DiasAnticipacion, // 1
      diasHabilitados: dias.map((row) => row.dia), //['LUNES']
      incluirHoy: true,
    });

    const fechasConsultorioSIAIS =
      await FichasMedicinaFalimiarRepository.getFechasByCuaderno({
        idCuaderno,
        idEstablecimiento,
        fecha_inicial: hoy,
        fecha_final: fechasHabilitados.at(-1).fecha,
      });

    const fechasSIAIS = new Set(
      fechasConsultorioSIAIS.map((item) => {
        return item.fecha instanceof Date
          ? item.fecha.toISOString().slice(0, 10)
          : item.fecha;
      }),
    );

    const resultado = fechasHabilitados.map((item) => ({
      ...item,
      tiene_fichas: fechasSIAIS.has(item.fecha),
    }));

    const fechasFormateadas = resultado.map((item, index) => {
      const [, mes, diaNumero] = item.fecha.split('-');

      return {
        id: index + 1,
        dia: diasSemana[item.dia],
        numero: diaNumero,
        mes: meses[mes],
        fecha: item.fecha,
        tiene_fichas: item.tiene_fichas,
        idpersonal: item.idpersonal,
      };
    });

    return fechasFormateadas;
  }
}
