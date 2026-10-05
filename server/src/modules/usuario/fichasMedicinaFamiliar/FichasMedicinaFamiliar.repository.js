import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';

export class FichasMedicinaFalimiarRepository {
  static async getFichasHistorial(payload) {
    const { matricula_codigo } = payload;
    const pool = await getConnection();
    const data = await pool
      .request()
      .input('matricula', sql.VarChar, matricula_codigo)
      .query(
        `SELECT TOP 15 ffp.fip_fecha_ini as fecha,
        LTRIM(RTRIM(hp.pac_nombre))+' '+LTRIM(RTRIM(hp.pac_primer_apellido))+' '+LTRIM(RTRIM(hp.pac_segundo_apellido )) as nombre_paciente, LTRIM(RTRIM(hc.cua_nombre)) AS consultorio,
        LTRIM(RTRIM(hps.per_nombre))+' '+LTRIM(RTRIM(hps.per_campo1))+' '+LTRIM(RTRIM(hps.per_campo2)) as nombre_medico
        FROM bdfichas.dbo.fic_fichas_programadas ffp,
        bdhistoriasclinicas.dbo.hcl_personal_salud hps,
        bdhistoriasclinicas.dbo.hcl_cuaderno hc,
        bdhistoriasclinicas.dbo.hcl_citas hc2,
        bdhistoriasclinicas.dbo.hcl_poblacion hp 
        WHERE  hps.idpersonalmedico = ffp.idpersonal
        AND hc.idCuaderno = ffp.idcuaderno
        AND hc2.idcita = ffp.idcita
        and hp.idpoblacion = hc2.idpoblacion
        and hp.pac_codigo =@matricula
        order by ffp.fip_fecha_ini desc;`,
      );

    if (data.recordsets[0].length == 0) {
      return null;
    }

    return data.recordsets[0];
  }

  static async getFechasByCuaderno({
    fecha_inicial,
    fecha_final,
    idCuaderno,
    idEstablecimiento,
  }) {
    const pool = await getConnection();

    const fechaInicialSQL = fecha_inicial.replaceAll('-', '');
    const fechaFinalSQL = fecha_final.replaceAll('-', '');

    const data = await pool
      .request()
      .input('fecha_inicial', sql.VarChar(8), fechaInicialSQL)
      .input('fecha_final', sql.VarChar(8), fechaFinalSQL)
      .input('idCuaderno', sql.Int, idCuaderno)
      .input('idEstablecimiento', sql.Int, idEstablecimiento).query(`
      SET LANGUAGE Spanish;
      SET DATEFORMAT dmy;

      SELECT DISTINCT
        ffpp.fecha
      FROM bdfichas.dbo.fic_fichas_programadas_pantalla ffpp
      WHERE ffpp.fecha > @fecha_inicial
        AND ffpp.fecha <= @fecha_final
        AND ffpp.idcuaderno = @idCuaderno
        AND ffpp.idestablecimiento = @idEstablecimiento
      ORDER BY ffpp.fecha;
    `);

    console.log('llega aca');
    return data.recordset.map((item) => ({
      ...item,
      fecha: item.fecha.toISOString().split('T')[0],
    }));
  }
}
