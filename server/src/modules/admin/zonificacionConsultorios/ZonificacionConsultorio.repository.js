import { col, Op } from 'sequelize';
import { ZodificacionConsultorioModel } from '../../../models/zonificacionConsultorio.model.js';
import { ConsultorioModel } from '../../../models/consultorio.model.js';
import { EstablecimientoModel } from '../../../models/establecimiento.model.js';

export class ZonificacionConsultorioRepository {
  static async getAll() {
    const data = await ZodificacionConsultorioModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: ConsultorioModel,
          as: 'consultorioCabecera',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: ConsultorioModel,
          as: 'consultorioAsignado',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });
    const agrupado = Object.values(
      data.reduce((acc, item) => {
        const row = item.toJSON();

        const asignadoId = row.consultorio_asignado_id;

        if (!acc[asignadoId]) {
          acc[asignadoId] = {
            id: row.consultorioAsignado.idCuaderno,
            nombre_consultorio: row.consultorioAsignado.nombre_consultorio,

            consultorios: [],
          };
        }

        acc[asignadoId].consultorios.push({
          zonificacion_id: row.id,
          id: row.consultorioCabecera.idCuaderno,
          nombre_consultorio: row.consultorioCabecera.nombre_consultorio,
          estado: row.estado,
        });

        return acc;
      }, {}),
    );

    return agrupado;
  }
  static async getId({ id, transaction }) {
    const data = await ZodificacionConsultorioModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: ConsultorioModel,
          as: 'consultorioCabecera',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'fk_idestablecimiento',
              'tipo_consultorio_id',
              'estado',
              'nombre_consultorio',
            ],
          },
          include: [
            {
              model: EstablecimientoModel,
              as: 'establecimientoConsultorio',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'nombre_establecimiento'],
              },
            },
          ],
        },
        {
          model: ConsultorioModel,
          as: 'consultorioAsignado',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      where: {
        consultorio_asignado_id: id,
      },
      transaction,
    });
    return data;

    const agrupado = Object.values(
      data.reduce((acc, item) => {
        const row = item.toJSON();

        const asignadoId = row.consultorio_asignado_id;

        if (!acc[asignadoId]) {
          acc[asignadoId] = {
            id: row.consultorioAsignado.idCuaderno,

            consultorios: [],
          };
        }

        acc[asignadoId].consultorios.push({
          id: row.consultorioCabecera.idCuaderno,
        });

        return acc;
      }, {}),
    );

    const agrupadoNorm = agrupado.map((row) => ({
      consultorio_asignado_id: row.id,
      consultorioCabecera: row.consultorios.map((row) => row.id),
    }));
    return agrupadoNorm[0];
  }
  static async createByArray({ payload, transaction = null }) {
    const data = await ZodificacionConsultorioModel.bulkCreate(payload, {
      transaction,
    });
    return data;
  }
  static async deleteByArray({ id, payload, transaction = null }) {
    const data = await ZodificacionConsultorioModel.findAll({
      where: {
        consultorio_asignado_id: id,
        consultorio_cabecera_id: { [Op.in]: payload },
      },
      transaction,
      raw: true,
    });
    await ZodificacionConsultorioModel.destroy({
      where: {
        consultorio_asignado_id: id,
        consultorio_cabecera_id: { [Op.in]: payload },
      },
      transaction,
    });

    return data;
  }
  static async searchChangeByArray({ id, payload, transaction = null }) {
    const actuales = await ZodificacionConsultorioModel.findAll({
      where: {
        consultorio_asignado_id: id,
      },
      transaction,
      raw: true,
    });

    const idsActuales = actuales.map((item) => item.consultorio_cabecera_id);

    const agregar = payload.filter((id) => !idsActuales.includes(id));
    const eliminar = idsActuales.filter((id) => !payload.includes(id));

    return { agregar, eliminar };
  }
  static async changeStatus() {}
  static async searchCabecera({ consultorio_cabecera_id, transaction = null }) {
    const data = await ZodificacionConsultorioModel.findOne({
      where: {
        consultorio_cabecera_id,
      },
      transaction,
    });
    if (!data) {
      return null;
    }
    return data;
  }
  static async searchAginadoByArray({ payload, transaction = null }) {
    const data = await ZodificacionConsultorioModel.findAll({
      where: {
        consultorio_asignado_id: {
          [Op.in]: payload,
        },
      },
      transaction,
    });
    if (data.length === 0) {
      return null;
    }
    return data;
  }
}
