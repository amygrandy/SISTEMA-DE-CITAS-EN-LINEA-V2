import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';

export class HistorialRepository {
  static async getHistorial({ id }) {
    console.log('****************');
    console.log(id);
    console.log('****************');

    const pool = await getConnection();

    const data = await pool
      .request()
      .input('id', sql.Int, id)
      .query(
        `SELECT top 20
        LTRIM(RTRIM(hps.per_nombre))+' '+
        LTRIM(RTRIM(hps.per_campo1))+' '+
        LTRIM(RTRIM(hps.per_campo2)) AS medico,
        LTRIM(RTRIM(hc.cua_nombre))  AS consultorio,
        ffp.fip_fecha_ini,
        CASE ffp.fip_estado
        WHEN 'L' THEN 'Libre'
        WHEN 'A' THEN 'FALTA'
        WHEN 'T' THEN 'ATENDIDO'
        WHEN 'N' THEN 'FALTA'
        WHEN 'V' THEN 'FALTA'
        WHEN 'D' THEN 'FALTA'
        WHEN 'M' THEN 'FALTA'
        when 'R' then 'FALTA'
        ELSE 'Desconocido'
        END AS estado_descripcion,
        LTRIM(RTRIM(hee.est_nombre )) as establecimiento
        FROM bdfichas.dbo.fic_fichas_programadas ffp,
        bdhistoriasclinicas.dbo.hcl_personal_salud hps,
        bdhistoriasclinicas.dbo.hcl_cuaderno hc,
        bdhistoriasclinicas.dbo.hcl_citas hhh,
        bdhistoriasclinicas.dbo.hcl_poblacion hpn,
        bdhistoriasclinicas.dbo.hcl_establecimiento hee
        WHERE
        hps.idpersonalmedico = ffp.idpersonal
        AND hc.idCuaderno = ffp.idcuaderno
        AND hhh.idcita = ffp.idcita
        and hpn.idpoblacion = hhh.idpoblacion 
        and hee.idestablecimiento = hhh.idestablecimiento 
        and hpn.idpoblacion = @id
        order by ffp.fip_fecha_ini DESC;`,
      );

    return data.recordsets[0];
  }
}
