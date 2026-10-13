import { FichasMedicinaFalimiarRepository } from '../FichasMedicinaFamiliar.repository.js';
import { FichasEliminadasRepository } from '../../../admin/fichasEliminadas/fichasEliminadas.respository.js';
import { FichaWebRepository } from '../../../admin/fichaWeb/fichaWeb.respository.js';
import { CantidadBeneficiariosRepository } from '../../../admin/cantidadBeneficiarios/cantidadBenecifiarios.respository.js';
import { CupoFichasRepository } from '../../../admin/cuposFichas/CuposFichas.respository.js';
import { puedeCancelarFicha } from '../../../../shared/services/funciones.js';
import { sequelize } from '../../../../config/database.js';

export class RemoveFichasUseCase {
  static async execute({ id }) {
    const t = await sequelize.transaction();
    try {
      const buscarCantidadBene = await CantidadBeneficiariosRepository.getById({
        transaction: t,
      });
      if (!buscarCantidadBene) {
        const err = new Error('No se contro la configuracion');
        err.statusCode = 404;
        throw err;
      }

      //consulta a otra base de datos
      const buscarFicha = await FichasMedicinaFalimiarRepository.getByIdFicha({
        id,
      });

      if (!buscarFicha) {
        const err = new Error('No se contro la ficha');
        err.statusCode = 404;
        throw err;
      }

      const validacionCancelarFicha = puedeCancelarFicha({
        fechaFicha: buscarFicha.fecha_ini,
        minutos: buscarCantidadBene.tiempo_para_cancelar_ficha,
      });

      // console.log(validacionCancelarFicha);

      if (!validacionCancelarFicha.puedeCancelar) {
        const error = new Error(
          `La cancelación debe realizarse con más de ${buscarCantidadBene.tiempo_para_cancelar_ficha} minutos de anticipación.`,
        );
        error.statusCode = 409;
        throw error;
      }

      const actualizarLimites = await CupoFichasRepository.updateLimite({
        cuaderno_id: buscarFicha.cuaderno_id,
        establecimiento_id: buscarFicha.establecimiento_id,
        fecha: buscarFicha.fecha_ini.toISOString().split('T')[0],
        transaction: t,
      });

      if (!actualizarLimites) {
        const error = new Error('No se pudo actualizar el cupo de la ficha');
        error.statusCode = 409;
        throw error;
      }

      //consulta a mi bd
      await FichasEliminadasRepository.create({
        payload: {
          ...buscarFicha,
          fecha: buscarFicha.fecha_ini.toISOString().split('T')[0],
        },
        transaction: t,
      });
      //consulta a mi bd
      await FichaWebRepository.removeFichaWeb({
        id,
        transaction: t,
      });

      //consulta a otra base de datos
      await FichasMedicinaFalimiarRepository.removerFicha({
        idfichaprogramada: id,
      });

      // if (!data.ok) {
      //   const err = new Error('No se pudo eliminar la ficha');
      //   err.statusCode = 404;
      //   throw err;
      // }
      t.commit();
      return buscarFicha;
    } catch (e) {
      t.rollback();
      throw e;
    }
  }
}
