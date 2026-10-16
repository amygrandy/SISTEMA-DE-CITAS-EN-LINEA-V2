import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';
import { api } from '../../../axios/api.js';

export class BeneficiarioService {
  static async getBenericiarios({ matricula }) {
    // const matriculaAsegurado = matricula + 'ID';
    // const pool = await getConnection();
    // const data = await pool
    //   .request()
    //   .input('matricula', sql.VarChar, matricula)
    //   .input('matriculaAsegurado', sql.VarChar, matriculaAsegurado).query(`
    //        SELECT
    //         hp.idpoblacion,
    //         LTRIM(RTRIM(haa.pac_codigo)) AS pac_codigo,
    //         LTRIM(RTRIM(hp.pac_nombre)) +' '+
    //         LTRIM(RTRIM(hp.pac_primer_apellido)) +' '+
    //         LTRIM(RTRIM(hp.pac_segundo_apellido)) as nombre_completo,
    //         LTRIM(RTRIM(hp.pac_documento_id)) AS cedula_identidad,
    //         LTRIM(RTRIM(haa.parentesco)) AS parentesco,
    //         hp.pac_fecha_nac
    //     FROM bdhistoriasclinicas.dbo.hcl_poblacion_afiliacion hpa
    //     INNER JOIN bdhistoriasclinicas.dbo.hcl_cuaderno hc
    //         ON hpa.idcuaderno = hc.idCuaderno
    //     INNER JOIN bdhistoriasclinicas.dbo.hcl_poblacion hp
    //         ON hp.idpoblacion = hpa.idpoblacion
    //     INNER JOIN bdhistoriasclinicas.dbo.hcl_establecimiento he
    //         ON hp.idestablecimiento = he.idestablecimiento
    //     INNER JOIN bdhistoriasclinicas.dbo.hcl_afiliacion_actual haa
    //         ON hpa.idpoblacion = haa.idpoblacion
    //     WHERE LTRIM(RTRIM(haa.pac_nro_asegurado)) = @matricula
    //     AND hp.pac_codigo != @matriculaAsegurado`);

    // if (data.recordsets[0].length == 0) {
    //   return null;
    // }
    // return data.recordsets[0];

    const response = await api.get(`asegurado/beneficiarios/${matricula}`);

    return response.data;
  }
}
