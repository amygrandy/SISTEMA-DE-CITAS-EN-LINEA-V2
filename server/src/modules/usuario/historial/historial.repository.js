import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';

export class HistorialRepository {
  static async getHistorial({ id, fecha }) {
    const pool = await getConnection();

    const data = await pool
      .request()
      .input('id', sql.Int, id)
      .input('fecha', sql.Date, fecha)
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
        AND ffp.fip_fecha_ini <= @fecha
        order by ffp.fip_fecha_ini DESC;`,
      );

    return data.recordsets[0];
  }
  static async getFichasProgramadas({ id }) {
    const pool = await getConnection();

    const data = await pool
      .request()
      .input('id', sql.Int, id)
      .input('fecha', sql.Date, fecha).query(`
      SET LANGUAGE Spanish;
      SET DATEFORMAT dmy;

        SELECT TOP 20
            ffp.idfichaprogramada,
            LTRIM(RTRIM(hps.per_nombre)) + ' ' +
            LTRIM(RTRIM(hps.per_campo1)) + ' ' +
            LTRIM(RTRIM(hps.per_campo2)) AS medico,
            LTRIM(RTRIM(hc.cua_nombre)) AS consultorio,
            hc.idCuaderno,
            ffp.fip_fecha_ini,
            CASE ffp.fip_estado
            WHEN 'L' THEN 'Libre'
            WHEN 'A' THEN 'Sacado en vigencia'
            WHEN 'T' THEN 'Atendido ya tien su consulta'
            WHEN 'N' THEN 'No atendido Falta'
            WHEN 'V' THEN 'Visita a domicilio'
            WHEN 'D' THEN 'No acude el paciente Falta'
            WHEN 'M' THEN 'Reconsulta Medico'
            when 'R' then 'Sacado desde la web'
            ELSE 'Desconocido'
            END AS estado_descripcion,
            LTRIM(RTRIM(hee.est_nombre)) AS establecimiento,
            hee.idestablecimiento ,
            LTRIM(RTRIM(hpn.pac_nombre))+' '+LTRIM(RTRIM(hpn.pac_primer_apellido))
            +' '+ LTRIM(RTRIM(hpn.pac_segundo_apellido )) AS nombre_paciente,
            hpn.pac_codigo,
            hpn.pac_documento_id as cedula_indentidad
        FROM bdfichas.dbo.fic_fichas_programadas AS ffp
        INNER JOIN bdhistoriasclinicas.dbo.hcl_personal_salud AS hps
            ON hps.idpersonalmedico = ffp.idpersonal
        INNER JOIN bdhistoriasclinicas.dbo.hcl_cuaderno AS hc
            ON hc.idCuaderno = ffp.idcuaderno
        INNER JOIN bdhistoriasclinicas.dbo.hcl_citas AS hhh
            ON hhh.idcita = ffp.idcita
        INNER JOIN bdhistoriasclinicas.dbo.hcl_poblacion AS hpn
            ON hpn.idpoblacion = hhh.idpoblacion
        INNER JOIN bdhistoriasclinicas.dbo.hcl_establecimiento AS hee
            ON hee.idestablecimiento = hhh.idestablecimiento
        WHERE
            hpn.idpoblacion = @id
            AND ffp.fip_fecha_ini > @fecha
        ORDER BY
            ffp.fip_fecha_ini ASC;
      `);

    return data.recordsets[0];
  }
  static async getFichasRangoFechas({ matricula, fecha_ini, fecha_final }) {
    const pool = await getConnection();

    const data = await pool
      .request()
      .input('fecha_ini', sql.VarChar, fecha_ini)
      .input('fecha_final', sql.VarChar, fecha_final)
      .input('matricula', sql.VarChar, matricula).query(`
      SELECT RTRIM( hp.pac_nombre)+' '+RTRIM(hp.pac_primer_apellido)+' '+RTRIM(hp.pac_segundo_apellido) as nombre_completo,
      RTRIM(hc2.cua_nombre ) as consultorio, RTRIM(hps.per_nombre )+' '+RTRIM(hps.per_campo1 )+' '+RTRIM(hps.per_campo2 ) as medico,
      ffp.fip_fecha_ini,RTRIM(hp.pac_numero_historia) as pac_numero_historia ,RTRIM(hp.pac_codigo) as pac_codigo
      FROM bdfichas.dbo.fic_fichas_programadas ffp 
      INNER JOIN bdhistoriasclinicas.dbo.hcl_citas hc on hc.idcita =ffp.idcita
      INNER JOIN bdhistoriasclinicas.dbo.hcl_poblacion hp on hp.idpoblacion = hc.idpoblacion
      INNER JOIN bdhistoriasclinicas.dbo.hcl_cuaderno hc2 on hc2.idCuaderno = ffp.idcuaderno 
      INNER JOIN bdhistoriasclinicas.dbo.hcl_personal_salud hps on hps.idpersonalmedico = ffp.idpersonal 
      WHERE hp.pac_numero_historia  = @matricula
      and ffp.fip_fecha_ini >= @fecha_ini
      and ffp.fip_fecha_ini < @fecha_final;
      `);

    return data.recordsets[0];
  }
}
