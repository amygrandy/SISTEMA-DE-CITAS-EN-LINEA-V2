import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';
import { ConsultorioModel } from '../../../models/consultorio.model.js';
import { TipoConsultorioModel } from '../../../models/tipoConsultorio.model.js';
import { EstablecimientoModel } from '../../../models/establecimiento.model.js';
import { diaSemanaModel } from '../../../models/diaSemana.model.js';
import { col, Op } from 'sequelize';
import { api } from '../../../axios/api.js';
import axios from 'axios';

export class ConsultorioRepository {
  static async getAllSIAIS({ establecimiento_id }) {
    //const pool = await getConnection();
    if (!establecimiento_id) {
      // const result = await pool.request().query(
      //   `select he.idestablecimiento,LTRIM(RTRIM(he.est_nombre))  as empresa,hc.idCuaderno, LTRIM(RTRIM(hc.cua_nombre)) as consultorio FROM bdhistoriasclinicas.dbo.hcl_cuaderno hc
      //   inner join bdfichas.dbo.fic_cuaderno_sala fcs on hc.idCuaderno = fcs.idcuaderno
      //   inner join bdhistoriasclinicas.dbo.hcl_establecimiento he on he.idestablecimiento = fcs.idestablecimiento
      //   order by he.est_nombre ;`,
      // );
      // return result.recordsets[0];

      const response = await axios('/consultorio/0');
      return response.data;
    } else {
      // const result = await pool
      //   .request()
      //   .input('establecimiento_id', sql.Int, establecimiento_id)
      //   .query(
      //     `select he.idestablecimiento,LTRIM(RTRIM(he.est_nombre))  as empresa,hc.idCuaderno, LTRIM(RTRIM(hc.cua_nombre)) as consultorio FROM bdhistoriasclinicas.dbo.hcl_cuaderno hc
      //     inner join bdfichas.dbo.fic_cuaderno_sala fcs on hc.idCuaderno = fcs.idcuaderno
      //     inner join bdhistoriasclinicas.dbo.hcl_establecimiento he on he.idestablecimiento = fcs.idestablecimiento
      //     WHERE he.idestablecimiento = @establecimiento_id
      //     order by he.est_nombre ;`,
      //   );
      // return result.recordsets[0];

      const response = await axios(`/consultorio/${establecimiento_id}`);
      return response.data;
    }
  }
  static async getIdSIAIS({ consultorio_id }) {
    //const pool = await getConnection();
    // const result = await pool
    //   .request()
    //   .input('consultorio_id', sql.Int, consultorio_id)
    //   .query(
    //     `select hc.idCuaderno as value, LTRIM(RTRIM(hc.cua_nombre)) as label FROM bdhistoriasclinicas.dbo.hcl_cuaderno hc
    //       inner join bdfichas.dbo.fic_cuaderno_sala fcs on hc.idCuaderno = fcs.idcuaderno
    //       inner join bdhistoriasclinicas.dbo.hcl_establecimiento he on he.idestablecimiento = fcs.idestablecimiento
    //       WHERE hc.idCuaderno = @consultorio_id
    //       order by he.est_nombre ;`,
    //   );
    // return result.recordsets[0][0];

    const response = await axios(`/consultorio/id/${consultorio_id}`);

    return response.data;
  }
  static async getSelectSIAIS({ establecimiento_id }) {
    // const pool = await getConnection();
    if (!establecimiento_id) {
      return [];
    } else {
      // const result = await pool
      //   .request()
      //   .input('establecimiento_id', sql.Int, establecimiento_id)
      //   .query(
      //     `select hc.idCuaderno as value, LTRIM(RTRIM(hc.cua_nombre)) as label FROM bdhistoriasclinicas.dbo.hcl_cuaderno hc
      //     inner join bdfichas.dbo.fic_cuaderno_sala fcs on hc.idCuaderno = fcs.idcuaderno
      //     inner join bdhistoriasclinicas.dbo.hcl_establecimiento he on he.idestablecimiento = fcs.idestablecimiento
      //     WHERE he.idestablecimiento = @establecimiento_id
      //     order by he.est_nombre ;`,
      //   );
      // return result.recordsets[0];
      const response = await api.get(
        `consultorio/seleccionado/${establecimiento_id}`,
      );
      return response.data;
    }
  }
  static async getAll({
    establecimiento_id = null,
    tipo_consultorio_id = null,
  }) {
    const where = {};
    if (establecimiento_id) where.fk_idestablecimiento = establecimiento_id;
    if (tipo_consultorio_id) where.tipo_consultorio_id = tipo_consultorio_id;

    const data = await ConsultorioModel.findAll({
      where,
      attributes: [
        'idCuaderno',
        'nombre_consultorio',
        'cantidad_fichas_por_dia',
        'dias_anticipacion',
        [col('tipoConsultorio.nombre_tipo'), 'tipo_consultorio'],
        [
          col('establecimientoConsultorio.nombre_establecimiento'),
          'nombre_establecimiento',
        ],
        'estado',
      ],
      include: [
        {
          model: TipoConsultorioModel,
          as: 'tipoConsultorio',
          attributes: [],
        },
        {
          model: EstablecimientoModel,
          as: 'establecimientoConsultorio',
          attributes: [],
        },
      ],
    });
    return data;
  }
  static async create({ payload, transaction = null }) {
    const data = await ConsultorioModel.create(payload, { transaction });
    return data;
  }
  static async getByName({ nombre_consultorio, transaction = null }) {
    const data = await ConsultorioModel.findOne({
      where: {
        nombre_consultorio,
      },
      transaction,
    });
    if (!data) {
      return null;
    }
    return data;
  }
  static async getById({ id, transaction = null }) {
    const data = await ConsultorioModel.findOne({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: diaSemanaModel,
          as: 'dias',
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        idCuaderno: id,
      },
      transaction,
    });

    if (!data) {
      return null;
    }
    return data.toJSON();
  }
  static async getConsultorioByTipoByEstablecimiento({
    tipo_consultorio_id,
    establecimiento_id,
    transaction = null,
  }) {
    const data = await ConsultorioModel.findAll({
      attributes: [
        ['idCuaderno', 'value'],
        ['nombre_consultorio', 'label'],
      ],
      where: {
        fk_idestablecimiento: establecimiento_id,
        tipo_consultorio_id,
      },
      transaction,
      raw: true,
    });
    return data;
  }
  static async changeTipoConsultorio({ id, payload, transaction = null }) {
    const data = await ConsultorioModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }
    await data.update(payload, { transaction });
    return data;
  }
  static async changeStatus({ id, transaction = null }) {
    const data = await ConsultorioModel.findOne({
      where: {
        idCuaderno: id,
      },
      transaction,
    });

    if (!data) {
      return null;
    }
    await data.update({ estado: !data.toJSON().estado }, { transaction });
    return data;
  }
  static async getByIdArray({ ids = [], transaction = null }) {
    const data = await ConsultorioModel.findAll({
      where: {
        idCuaderno: {
          [Op.in]: ids,
        },
      },
      transaction,
      raw: true,
    });
    if (ids.length !== data.length) {
      return null;
    }
    return data;
  }
  static async getSelectByIdEstablecimiento({
    establecimiento_id,
    transaction = null,
  }) {
    const data = await ConsultorioModel.findAll({
      attributes: [
        ['idCuaderno', 'value'],
        ['nombre_consultorio', 'label'],
      ],
      where: {
        fk_idestablecimiento: establecimiento_id,
      },
      raw: true,
    });
    return data;
  }
  static async getConfiguarionById({ id, transaction = null }) {
    const data = await ConsultorioModel.findByPk(id, {
      attributes: ['cantidad_fichas_por_dia', 'dias_anticipacion'],
      include: [
        {
          model: diaSemanaModel,
          as: 'dias',
          attributes: ['id'],
          through: { attributes: [] },
        },
      ],

      transaction,
    });

    if (!data) {
      return null;
    }
    return data.toJSON();
  }
  static async updateConfigurationById({ id, payload, transaction = null }) {
    const data = await ConsultorioModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }
    await data.update(payload, { transaction });
    return data;
  }
}
