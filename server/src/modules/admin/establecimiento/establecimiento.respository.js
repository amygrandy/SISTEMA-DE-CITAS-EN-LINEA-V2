import { EstablecimientoModel } from '../../../models/establecimiento.model.js';
import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';

import { api } from '../../../axios/api.js';

export class EstablecimientoRepository {
  static async getAllSIAIS() {
    // const pool = await getConnection();
    // const data = await pool.request().query(
    //   `SELECT he.idestablecimiento ,LTRIM(RTRIM(he.est_nombre))as nombre_centro
    //   FROM bdhistoriasclinicas.dbo.hcl_establecimiento he;`,
    // );
    // if (data?.recordsets[0].length == 0 || data == undefined) {
    //   return null;
    // }

    const response = await api.get('/establecimiento');

    return response.data;
  }
  static async getAll() {
    const data = await EstablecimientoModel.findAll({
      attributes: ['idestablecimiento', 'nombre_establecimiento'],
      raw: true,
    });
    return data;
  }
  static async getSelect() {
    const data = await EstablecimientoModel.findAll({
      attributes: [
        ['idestablecimiento', 'value'],
        ['nombre_establecimiento', 'label'],
      ],
      raw: true,
    });
    return data;
  }
  static async getById({ id, transaction }) {
    const data = await EstablecimientoModel.findByPk(id, { transaction });
    if (!data) {
      return null;
    }
    return data;
  }
}
