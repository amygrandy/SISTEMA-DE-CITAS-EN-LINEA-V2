import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';

class FichasMedicinaFalimiarRepository {
  async getFichasHistorial(payload) {
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
}

export default FichasMedicinaFalimiarRepository;
