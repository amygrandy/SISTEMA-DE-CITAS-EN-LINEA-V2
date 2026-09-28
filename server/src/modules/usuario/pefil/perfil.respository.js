import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';
import { formatDateText } from '../../../shared/services/funciones.js';

export class PefilServices {
  static async getPerfilAsegurado({ poblacion_id }) {
    const pool = await getConnection();

    const data = await pool
      .request()
      .input('poblacion_id', sql.Int, poblacion_id)
      .query(
        `SELECT
            p.idpoblacion,
            LTRIM(RTRIM(p.pac_numero_historia)) AS pac_numero_historia,
            LTRIM(RTRIM(p.pac_primer_apellido)) + ' '+
            LTRIM(RTRIM(p.pac_segundo_apellido)) + ' '+
            LTRIM(RTRIM(p.pac_nombre)) AS nombre_completo,
            p.pac_fecha_nac,
            CASE
                WHEN p.idsexo = 1 THEN 'Hombre'
                WHEN p.idsexo = 2 THEN 'Mujer'
                ELSE 'Desconocido'
            END AS sexo, 
            hlg.lis_valor AS documento,
            LTRIM(RTRIM(p.pac_documento_id)) AS pac_documento_id,
            LTRIM(RTRIM(r.pac_zona)) AS pac_zona,
            LTRIM(RTRIM(r.pac_calle)) AS pac_calle,
            LTRIM(RTRIM(r.pac_nro_direccion)) AS pac_nro_direccion,
            mrs.dep_descripcion AS localidad,
            a.pac_fecha_afiliacion,
            a.idcentroasignado AS idestablecimiento,
            a.idcuaderno,
            LTRIM(RTRIM(hc.cua_nombre)) AS consultorio,
            LTRIM(RTRIM( he.est_nombre)) AS establecimiento,
            LTRIM(RTRIM(a.emp_nro_empleador)) AS emp_nro_empleador,
            LTRIM(RTRIM(a.emp_nombre)) AS emp_nombre,
            a.idestadoafiliacion
        FROM hcl_poblacion p
        LEFT JOIN hcl_poblacion_residencia_actual r
            ON p.idpoblacion = r.idpoblacion
            AND r.pac_estado IN ('V', 'T', 'D')
        LEFT JOIN hcl_poblacion_otros o
            ON p.idpoblacion = o.idpoblacion
            AND o.pac_estado IN ('V', 'T', 'D')
        LEFT JOIN (
            SELECT
                af.*,
                e.emp_nro_empleador,
                e.emp_nombre
            FROM hcl_poblacion_afiliacion af
            LEFT JOIN hcl_empleador e
                ON af.idempleador = e.idempleador
        ) a
            ON p.idpoblacion = a.idpoblacion
            AND a.pac_estado IN ('V', 'T', 'D')
        INNER JOIN (
            SELECT
                idcodigo,
                LTRIM(RTRIM(lis_valor)) AS lis_valor
            FROM dbo.hcl_lista_generica
            WHERE lis_tabla = 'hcl_tipo_documento'
            AND idempresa = 2
        ) hlg
            ON p.idtipodocumento = hlg.idcodigo
        LEFT JOIN (
            SELECT
                m.idmunicipio,
                LTRIM(RTRIM(m.mun_descripcion)) AS mun_descripcion,
                LTRIM(RTRIM(pr.pro_descripcion)) AS pro_descripcion,
                LTRIM(RTRIM(d.dep_descripcion)) AS dep_descripcion
            FROM dbo.hcl_municipio m

            INNER JOIN dbo.hcl_provincia pr
                ON m.idprovincia = pr.idprovincia
                AND m.iddepartamento = pr.iddepartamento

            INNER JOIN dbo.hcl_departamento d
                ON pr.iddepartamento = d.iddepartamento
        ) mrs
            ON r.idmunicipioresidencia = mrs.idmunicipio
        LEFT JOIN bdhistoriasclinicas.dbo.hcl_cuaderno hc
            ON a.idcuaderno = hc.idCuaderno
        LEFT JOIN bdhistoriasclinicas.dbo.hcl_establecimiento he
            ON a.idcentroasignado = he.idestablecimiento
        WHERE p.idpoblacion = @poblacion_id;`,
      );

    if (data.recordsets[0].length == 0) {
      return null;
    }

    const perfil = {
      nombreCompleto: data?.recordsets[0][0]?.nombre_completo || '',
      ci: data?.recordsets[0][0]?.pac_documento_id || '',
      direccion: data?.recordsets[0][0]?.pac_nro_direccion || '',
      regional: data?.recordsets[0][0]?.localidad,
      fechaNacimiento: formatDateText(data?.recordsets[0][0]?.pac_fecha_nac),
      fechaAfiliacion: formatDateText(
        data?.recordsets[0][0]?.pac_fecha_afiliacion,
      ),
    };

    const empresa = {
      razonSocial: data?.recordsets[0][0]?.emp_nombre || '',
      numeroPatronal: data?.recordsets[0][0]?.emp_nro_empleador || '',
    };

    const centroMedico = {
      centroMedico: data?.recordsets[0][0]?.establecimiento || '',
      consultorio: data?.recordsets[0][0]?.consultorio || '',
    };

    return { perfil, empresa, centroMedico };
  }
}
