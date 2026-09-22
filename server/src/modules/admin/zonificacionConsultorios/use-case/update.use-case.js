import { ZonificacionConsultorioRepository } from '../ZonificacionConsultorio.repository.js';
import { ConsultorioRepository } from '../../consultorio/consultorio.repository.js';
import { sequelize } from '../../../../config/database.js';

export class UpdateUseCase {
  static async execute({ id, payload }) {
    return sequelize.transaction(async (t) => {
      const consultorioAsignado = await ConsultorioRepository.getById({
        id,
        transaction: t,
      });
      if (!consultorioAsignado) {
        const err = new Error('Algunos consultorios no se encontraron');
        err.statusCode = 404;
        throw err;
      }
      const buscarConsultorios = await ConsultorioRepository.getByIdArray({
        ids: payload,
        transaction: t,
      });
      if (!buscarConsultorios) {
        const err = new Error('Algunos consultorios no se encontraron');
        err.statusCode = 404;
        throw err;
      }

      const { agregar, eliminar } =
        await ZonificacionConsultorioRepository.searchChangeByArray({
          id,
          payload,
          transaction: t,
        });

      if (eliminar.length > 0) {
        await ZonificacionConsultorioRepository.deleteByArray({
          id,
          payload: eliminar,
          transaction: t,
        });
      }
      if (agregar.length > 0) {
        await ZonificacionConsultorioRepository.createByArray({
          payload: agregar.map((row) => ({
            consultorio_asignado_id: id,
            consultorio_cabecera_id: row,
          })),
          transaction: t,
        });
      }

      const data = await ZonificacionConsultorioRepository.getId({
        id,
        transaction: t,
      });
      return data;
    });
  }
}
