import { FichasMedicinaFalimiarRepository } from '../FichasMedicinaFamiliar.repository.js';
import { cupoFichaModel } from '../../../../models/cupoFichas.model.js';
import { FichaWebModel } from '../../../../models/fichaWeb.model.js';
import { sequelize } from '../../../../config/database.js';
import { Op } from 'sequelize';

export class ReservarFichaUseCase {
  static async execute({
    fecha,
    fecha_ini,
    fecha_final,
    cuaderno_id,
    poblacion_id,
    idfichaprogramada,
    cedula_identidad,
    nombre_completo,
    consultorio,
    personal_id,
    establecimiento_id,
    establecieminto,
    idcobertura,
  }) {
    const t = await sequelize.transaction();

    try {
      const [affectedRows] = await cupoFichaModel.update(
        {
          reservas: sequelize.literal('reservas + 1'),
        },
        {
          where: {
            fecha,
            cuaderno_id,
            establecimiento_id,

            [Op.and]: sequelize.literal('"reservas" < "limite"'),
          },
          transaction: t,
        },
      );

      if (affectedRows === 0) {
        const error = new Error(
          'No existe cupo disponible o se alcanzó el límite de fichas',
        );
        error.statusCode = 409;
        throw error;
      }

      const reserva = await FichaWebModel.create(
        {
          idfichaprogramada,
          fecha,

          poblacion_id,
          cedula_identidad,
          nombre_completo,

          cuaderno_id,
          consultorio,
          personal_id,

          establecimiento_id,
          establecieminto,

          estado: 'PENDIENTE',
        },
        {
          transaction: t,
        },
      );

      await t.commit();

      const fichaReservar =
        await FichasMedicinaFalimiarRepository.reservarFicha({
          paciente: poblacion_id,
          idfichaprogramada,
          idMedico: personal_id,
          idEstablecimiento: establecimiento_id,

          fecha_ini,
          fecha_fin: fecha_final,

          especialidad: cuaderno_id,
          cobertura: idcobertura,

          idusuario: 28,

          // WEB
          origen: 2,

          descripcionUsuario: 'USUARIO WEB',
        });

      if (fichaReservar.codigo !== 0) {
        const error = new Error('No se pudo reservar la ficha en SIAIS');
        error.statusCode = 400;
        throw error;
      }

      await reserva.update({
        estado: 'CONFIRMADA',
      });

      return reserva;
    } catch (error) {
      if (!t.finished) {
        await t.rollback();
      }

      throw error;
    }
  }
}
