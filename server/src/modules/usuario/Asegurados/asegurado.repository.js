import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';

export class AseguradoRepository {
  static async getAsegurados(payload) {
    const { matricula } = payload;

    const pool = await getConnection();

    const data = await pool
      .request()
      .input('matricula', sql.VarChar, matricula)
      .query(
        `SELECT 
            he.idestablecimiento,
            LTRIM(RTRIM(he.est_nombre)) AS establecimiento,
            hc.idCuaderno,
            LTRIM(RTRIM(hc.cua_nombre)) AS cuaderno,
            hp.idpoblacion,
            LTRIM(RTRIM(haa.pac_nro_asegurado)) AS pac_nro_asegurado,
            LTRIM(RTRIM(haa.pac_codigo)) AS pac_codigo,
            LTRIM(RTRIM(hp.pac_nombre)) +' '+
            LTRIM(RTRIM(hp.pac_primer_apellido)) +' '+
            LTRIM(RTRIM(hp.pac_segundo_apellido)) as nombre_completo,
            LTRIM(RTRIM(hp.pac_documento_id)) AS cedula_identidad,
            LTRIM(RTRIM(haa.parentesco)) AS parentesco
        FROM bdhistoriasclinicas.dbo.hcl_poblacion_afiliacion hpa
        INNER JOIN bdhistoriasclinicas.dbo.hcl_cuaderno hc 
            ON hpa.idcuaderno = hc.idCuaderno
        INNER JOIN bdhistoriasclinicas.dbo.hcl_poblacion hp 
            ON hp.idpoblacion = hpa.idpoblacion
        INNER JOIN bdhistoriasclinicas.dbo.hcl_establecimiento he 
            ON hp.idestablecimiento = he.idestablecimiento
        INNER JOIN bdhistoriasclinicas.dbo.hcl_afiliacion_actual haa 
            ON hpa.idpoblacion = haa.idpoblacion
        WHERE haa.pac_nro_asegurado = @matricula;`,
      );

    if (data.recordsets[0].length == 0) {
      return null;
    }
    return data.recordsets[0];
  }
  static async getSelectPaciente({ payload }) {
    const { matricula } = payload;

    const pool = await getConnection();

    const data = await pool
      .request()
      .input('matricula', sql.VarChar, matricula)
      .query(
        `SELECT 
        hp.idpoblacion, 
        LTRIM(RTRIM(hp.pac_nombre))+' '+LTRIM(RTRIM(hp.pac_primer_apellido))+' '+LTRIM(RTRIM(hp.pac_segundo_apellido)) as nombre_completo,
        hp.pac_documento_id as cedula_identidad,
        hpa.idcuaderno,
        LTRIM(RTRIM(hc.cua_nombre)) as consultorio,
        hpa.idcentroasignado as idestablecimiento,
        LTRIM(RTRIM(he.est_nombre)) as establecieminto,
        hpa.idcobertura,
        hp.pac_codigo,
        LTRIM(RTRIM(hc.cua_sigla)) as cua_sigla,
        hp.pac_numero_historia as codigo_asegurado
        FROM bdhistoriasclinicas.dbo.hcl_poblacion hp 
        INNER JOIN bdhistoriasclinicas.dbo.hcl_poblacion_afiliacion hpa  on hp.idpoblacion =hpa.idpoblacion 
        INNER JOIN bdhistoriasclinicas.dbo.hcl_cuaderno hc on hc.idCuaderno = hpa.idcuaderno 
        INNER JOIN bdhistoriasclinicas.dbo.hcl_establecimiento he on he.idestablecimiento = hpa.idcentroasignado  
        WHERE hp.pac_numero_historia  = @matricula
        ORDER BY hp.idpoblacion asc;`,
      );

    if (data.recordsets[0].length == 0) {
      return null;
    }
    return data.recordsets[0];
  }
}

export default AseguradoRepository;
