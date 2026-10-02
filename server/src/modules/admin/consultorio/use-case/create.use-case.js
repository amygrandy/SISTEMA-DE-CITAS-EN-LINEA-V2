import { sequelize } from '../../../../config/database.js';
import { ConsultorioRepository } from '../consultorio.repository.js';
import { EstablecimientoRepository } from '../../establecimiento/establecimiento.respository.js';
import { DiaSemanaRepository } from '../../diaSemana/diaSemana.respository.js';
import { ConsultorioDiaSemanaRepository } from '../../consultorioDiaSemana/consultorioDiaSemana.repository.js';

export class CreateUseCase {
  static async execute({ payload }) {
    return sequelize.transaction(async (t) => {
      const {
        idCuaderno,
        fk_idestablecimiento,
        nombre_consultorio,
        tipo_consultorio_id,
        dias_habilitados = [],
        ...parent
      } = payload;

      const buscarEstablecimiento = await EstablecimientoRepository.getById({
        id: fk_idestablecimiento,
        transaction: t,
      });
      if (!buscarEstablecimiento) {
        const err = new Error('No se encontro el establecimiento');
        err.statusCode = 404;
        throw err;
      }
      const buscarConsultorioSIAIS = await ConsultorioRepository.getIdSIAIS({
        consultorio_id: idCuaderno,
      });
      if (!buscarConsultorioSIAIS) {
        const err = new Error('No se encontro el consultorio');
        err.statusCode = 404;
        throw err;
      }
      const buscarDoble = await ConsultorioRepository.getById({
        id: idCuaderno,
        transaction: t,
      });

      if (buscarDoble) {
        const err = new Error(
          'Ya existe el consultorio en el sistema de fichas',
        );
        err.statusCode = 409;
        throw err;
      }
      const crearConsultorio = await ConsultorioRepository.create({
        payload: {
          ...parent,
          idCuaderno,
          fk_idestablecimiento,
          nombre_consultorio,
          tipo_consultorio_id,
        },
        transaction: t,
      });

      if (!crearConsultorio) {
        const err = new Error('No se pudo crear el consultorio');
        err.statusCode = 409;
        throw err;
      }

      const buscarDiaSemana = await DiaSemanaRepository.getArrayById({
        ids: dias_habilitados,
        transaction: t,
      });

      if (!buscarDiaSemana) {
        const err = new Error('No se encontraron algunos dias de la semana');
        err.statusCode = 404;
        throw err;
      }

      await ConsultorioDiaSemanaRepository.createByArray({
        payload: dias_habilitados.map((row) => ({
          consultorio_id: crearConsultorio.idCuaderno,
          dia_semana_id: row,
        })),
        transaction: t,
      });

      return { crearConsultorio, buscarDiaSemana };
    });
  }
}
