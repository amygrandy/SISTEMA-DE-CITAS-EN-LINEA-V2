import { ConsultorioRepository } from '../consultorio.repository.js';
import { ConsultorioDiaSemanaRepository } from '../../consultorioDiaSemana/consultorioDiaSemana.repository.js';
import { DiaSemanaRepository } from '../../diaSemana/diaSemana.respository.js';
import { sequelize } from '../../../../config/database.js';

export class updateConfigurationByIdUseCase {
  static async execute({ id, payload }) {
    const { dias_habilitados = [], ...parent } = payload;
    return sequelize.transaction(async (t) => {
      if (Object.keys(parent ?? {}).length > 0) {
        const updated = await ConsultorioRepository.updateConfigurationById({
          id,
          payload: parent,
          transaction: t,
        });
        if (!updated) {
          const err = new Error('No se econtro el consultorio');
          err.statusCode = 404;
          throw err;
        }
        if (dias_habilitados.length > 0) {
          const buscar_dias = await DiaSemanaRepository.getArrayById({
            ids: dias_habilitados,
            transaction: t,
          });

          if (!buscar_dias) {
            const err = new Error('No se econtraron los dias');
            err.statusCode = 404;
            throw err;
          }

          const { dataAdd, dataRemove } =
            await ConsultorioDiaSemanaRepository.getCambios({
              consultorio_id: id,
              dias_id: dias_habilitados,
              transaction: t,
            });

          if (dataAdd.length > 0) {
            await ConsultorioDiaSemanaRepository.createByArray({
              payload: dataAdd.map((row) => ({
                consultorio_id: id,
                dia_semana_id: row,
              })),
              transaction: t,
            });
          }
          if (dataRemove.length > 0) {
            const removeData =
              await ConsultorioDiaSemanaRepository.eliminarByArray({
                consultorio_id: id,
                transaction: t,
                dias_id: dataRemove,
              });
            if (!removeData) {
              const err = new Error('No se pudo eliminar los dias ');
              err.statusCode = 404;
              throw err;
            }
          }
          return updated;
        }

        return updated;
      } else {
        const buscarConsultorio = await ConsultorioRepository.getById({
          id,
          transaction: t,
        });
        if (!buscarConsultorio) {
          const err = new Error('No se econtraron el consultorio');
          err.statusCode = 404;
          throw err;
        }
        if (dias_habilitados.length > 0) {
          const buscar_dias = await DiaSemanaRepository.getArrayById({
            ids: dias_habilitados,
            transaction: t,
          });
          if (!buscar_dias) {
            const err = new Error('No se econtraron los dias');
            err.statusCode = 404;
            throw err;
          }

          const { dataAdd, dataRemove } =
            await ConsultorioDiaSemanaRepository.getCambios({
              consultorio_id: id,
              dias_id: dias_habilitados,
              transaction: t,
            });
          if (dataAdd.length > 0) {
            await ConsultorioDiaSemanaRepository.createByArray({
              payload: dataAdd.map((row) => ({
                consultorio_id: id,
                dia_semana_id: row,
              })),
              transaction: t,
            });
          }
          if (dataRemove.length > 0) {
            const removeData =
              await ConsultorioDiaSemanaRepository.eliminarByArray({
                consultorio_id: id,
                dias_id: dataRemove,
                transaction: t,
              });
            if (!removeData) {
              const err = new Error('No se pudo eliminar los dias ');
              err.statusCode = 404;
              throw err;
            }
          }
          return { dataAdd, dataRemove };
        }
      }
    });
  }
}
