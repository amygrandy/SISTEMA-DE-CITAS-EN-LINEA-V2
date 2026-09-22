import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';

export default class PoblacionRepository {
  async getAseguradoTitular(payload) {
    const { matricula } = payload;
    const adicionarIdMatrucula = matricula + 'ID';

    const pool = await getConnection();
    const data = await pool
      .request()
      .input('matricula', sql.VarChar, adicionarIdMatrucula)
      .query(
        `select hp.pac_codigo,hp.pac_documento_id 
        from bdhistoriasclinicas.dbo.hcl_poblacion hp WHERE hp.pac_codigo =@matricula;`,
      );

    if (data.recordsets[0].length == 0) {
      return null;
    }

    const usuario = {
      usuario: data.recordsets[0][0].pac_codigo.trim(),
      contrasenia: data.recordsets[0][0].pac_documento_id.trim(),
    };
    return usuario;
  }
  async getByMatriculaAsegurador(matricula) {
    const pool = await getConnection();
    const data = await pool
      .request()
      .input('matricula', sql.VarChar, matricula)
      .query(
        `select hp.idpoblacion ,hp.idestablecimiento,hp.pac_numero_historia,
        hp.pac_nombre, hp.pac_primer_apellido, hp.pac_segundo_apellido,hp.pac_documento_id 
        from bdhistoriasclinicas.dbo.hcl_poblacion hp WHERE hp.pac_numero_historia ='@matricula';`,
      );
    return data;
  }
  async getAseguradoComprobar(payload) {
    const { matricula } = payload;
    const adicionarIdMatrucula = matricula + 'ID';

    const pool = await getConnection();
    const data = await pool
      .request()
      .input('matricula', sql.VarChar, adicionarIdMatrucula)
      .query(
        `select hp.pac_numero_historia as matricula,hp.pac_codigo, hp.pac_nombre as nombres, 
        hp.pac_primer_apellido as apellido_paterno,hp.pac_segundo_apellido as apellido_materno,
        hp.pac_documento_id as cedula_indentidad,hp.pac_fecha_nac as fecha_nacimiento
        from bdhistoriasclinicas.dbo.hcl_poblacion hp WHERE hp.pac_codigo  = @matricula;`,
      );

    if (data.recordsets[0].length == 0) {
      return null;
    }

    const usuario = {
      matricula: data?.recordsets[0][0]?.matricula.trim(),
      pac_codigo: data?.recordsets[0][0]?.pac_codigo.trim(),
      nombres: data?.recordsets[0][0]?.nombres.trim(),
      apellido_paterno: data?.recordsets[0][0]?.apellido_paterno.trim(),
      apellido_materno: data?.recordsets[0][0]?.apellido_materno.trim(),
      cedula_indentidad: data?.recordsets[0][0]?.cedula_indentidad.trim(),
      fecha_nacimiento: data?.recordsets[0][0]?.fecha_nacimiento,
    };
    return usuario;
  }
}
