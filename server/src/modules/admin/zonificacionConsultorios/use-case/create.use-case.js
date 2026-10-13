import { ZonificacionConsultorioRepository } from '../ZonificacionConsultorio.repository.js';
import { ConsultorioRepository } from '../../consultorio/consultorio.repository.js';
export class CreateUseCase {
  static async execute({ payload }) {
    const { consultorioCabecera = [], consultorio_asignado_id } = payload;
    const buscarConsultorioAsignado = await ConsultorioRepository.getById({
      id: consultorio_asignado_id,
    });
    if (!buscarConsultorioAsignado) {
      const err = new Error('No se encontro el consultorio asignado');
      err.statusCode = 404;
      throw err;
    }
    const buscarConsultorioCabeceras = await ConsultorioRepository.getByIdArray(
      { ids: consultorioCabecera },
    );
    if (buscarConsultorioCabeceras.length !== consultorioCabecera.length) {
      const err = new Error('Alguno cosultorios cabeceras no se encontraron');
      err.statusCode = 404;
      throw err;
    }
    // const buscarCabeceraRepetida =
    //   await ZonificacionConsultorioRepository.searchCabecera({
    //     consultorio_cabecera_id: consultorio_asignado_id,
    //   });

    // if (buscarCabeceraRepetida) {
    //   const err = new Error(
    //     'El consultorio asignado ya esta en uso y esta asignado a un cosultorio',
    //   );
    //   err.statusCode = 404;
    //   throw err;
    // }
    const buscarConsultorioAsignadoAsignadoEnUso =
      await ZonificacionConsultorioRepository.searchAginadoByArray({
        payload: consultorioCabecera,
      });
    if (buscarConsultorioAsignadoAsignadoEnUso) {
      const err = new Error(
        'El consultorio es siendo usado como una zonificacion de varios consultorios',
      );
      err.statusCode = 404;
      throw err;
    }

    const zonificacion = await ZonificacionConsultorioRepository.createByArray({
      payload: buscarConsultorioCabeceras.map((row) => ({
        consultorio_cabecera_id: row.idCuaderno,
        consultorio_asignado_id,
      })),
    });
    return zonificacion;
  }
}
