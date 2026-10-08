import { FichasMedicinaFalimiarRepository } from '../FichasMedicinaFamiliar.repository.js';
import { EstablecimientoRepository } from '../../../admin/establecimiento/establecimiento.respository.js';
import { ConsultorioRepository } from '../../../admin/consultorio/consultorio.repository.js';
import { CupoFichasRepository } from '../../../admin/cuposFichas/CuposFichas.respository.js';

export class getHorariasByFechaByCuadernoUseCase {
  static async execute({ fecha, idCuaderno, idEstablecimiento }) {
    //
    const buscarCuaderno = await ConsultorioRepository.getById({
      id: idCuaderno,
    });
    if (!buscarCuaderno) {
      const err = new Error('No se encontro el consultorio');
      err.statusCode = 404;
      throw err;
    }
    const buscarEstablecimiento = await EstablecimientoRepository.getById({
      id: idEstablecimiento,
    });
    if (!buscarEstablecimiento) {
      const err = new Error('No se encontro el establecimiento');
      err.statusCode = 404;
      throw err;
    }

    const cuposFichas = await CupoFichasRepository.findOrCreate({
      cuaderno_id: idCuaderno,
      establecimiento_id: idEstablecimiento,
      fecha,
      limite: buscarCuaderno.cantidad_fichas_por_dia,
    });

    const data =
      await FichasMedicinaFalimiarRepository.getHorariasByFechaByCuaderno({
        fecha,
        idCuaderno,
        idEstablecimiento,
        limite: Number(cuposFichas.limite - cuposFichas.reservas),
      });

    return data;
  }
}
