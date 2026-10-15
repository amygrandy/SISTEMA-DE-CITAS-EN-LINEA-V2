import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';

export class ReporteRespository {
  static async getAllByConsultorioByMedico({
    establecimiento_id,
    consultorio_id,
    fecha_inicial,
    fecha_final,
    estado,
    tipo_cita,
  }) {
    const pool = await getConnection();
    if (estado) {
      const data = await pool
        .request()
        .input('establecimiento_id', sql.Int, establecimiento_id)
        .input('consultorio_id', sql.Int, consultorio_id)
        .input('fecha_inicial', sql.VarChar, fecha_inicial)
        .input('fecha_final', sql.VarChar, fecha_final)
        .input('tipo', sql.VarChar, tipo_cita).query(`
          SELECT ffp.idfichaprogramada , ffp.fip_fecha_ini ,LTRIM(RTRIM(hc2.cua_nombre)) as consultorio,
          LTRIM(RTRIM(hp.pac_nombre))+' '+LTRIM(RTRIM(hp.pac_primer_apellido ))+' '+LTRIM(RTRIM(hp.pac_segundo_apellido )) as paciente,LTRIM(RTRIM(hc.cit_observaciones)) as tipo_cita,ffp.fip_estado,
          LTRIM(RTRIM(hps.per_nombre ))+' '+LTRIM(RTRIM(hps.per_campo1))+' '+LTRIM(RTRIM(hps.per_campo2)) as nombre_medico,
          hc.cit_observaciones,
          CASE ffp.fip_estado
          WHEN 'L' THEN 'Libre'
          WHEN 'A' THEN 'Ocupado'
          WHEN 'T' THEN 'Atendido'
          WHEN 'N' THEN 'No atendido'
          WHEN 'V' THEN 'Visita a domicilio'
          WHEN 'D' THEN 'No acude el paciente'
          WHEN 'M' THEN 'Medico'
          when 'R' then 'web'
          ELSE 'Desconocido'
          END AS estado_descripcion
          FROM bdfichas.dbo.fic_fichas_programadas ffp
          INNER JOIN bdhistoriasclinicas.dbo.hcl_citas hc on ffp.idcita = hc.idcita
          INNER join bdhistoriasclinicas.dbo.hcl_poblacion hp on hp.idpoblacion = hc.idpoblacion  
          INNER join bdhistoriasclinicas.dbo.hcl_cuaderno hc2 on hc2.idCuaderno = ffp.idcuaderno
          INNER join bdhistoriasclinicas.dbo.hcl_personal_salud hps on hps.idpersonalmedico = ffp.idpersonal
          WHERE hc.cit_fecha_ini >= @fecha_inicial
          AND hc.cit_fecha_ini <  @fecha_final
          AND hc.cit_observaciones = @tipo
          AND hc.idcuaderno =@consultorio_id
          AND ffp.idestablecimiento = @establecimiento_id
          AND ffp.fip_estado = 'T'
          order by hc.cit_fecha_ini;`);

      return data.recordset;
    } else {
      const data = await pool
        .request()
        .input('establecimiento_id', sql.Int, establecimiento_id)
        .input('consultorio_id', sql.Int, consultorio_id)
        .input('fecha_inicial', sql.VarChar, fecha_inicial)
        .input('fecha_final', sql.VarChar, fecha_final)
        .input('tipo', sql.VarChar, tipo_cita).query(`
          SELECT ffp.idfichaprogramada , ffp.fip_fecha_ini ,LTRIM(RTRIM(hc2.cua_nombre)) as consultorio,
          LTRIM(RTRIM(hp.pac_nombre))+' '+LTRIM(RTRIM(hp.pac_primer_apellido ))+' '+LTRIM(RTRIM(hp.pac_segundo_apellido )) as paciente,LTRIM(RTRIM(hc.cit_observaciones)) as tipo_cita,ffp.fip_estado,
          LTRIM(RTRIM(hps.per_nombre ))+' '+LTRIM(RTRIM(hps.per_campo1))+' '+LTRIM(RTRIM(hps.per_campo2)) as nombre_medico,
          hc.cit_observaciones,
          CASE ffp.fip_estado
          WHEN 'L' THEN 'Libre'
          WHEN 'A' THEN 'Ocupado'
          WHEN 'T' THEN 'Atendido'
          WHEN 'N' THEN 'No atendido'
          WHEN 'V' THEN 'Visita a domicilio'
          WHEN 'D' THEN 'No acude el paciente'
          WHEN 'M' THEN 'Falta ficha sacada por el Medico'
          when 'R' then 'Falta ficha sacada por el Web'
          ELSE 'Desconocido'
          END AS estado_descripcion
          FROM bdfichas.dbo.fic_fichas_programadas ffp
          INNER JOIN bdhistoriasclinicas.dbo.hcl_citas hc on ffp.idcita = hc.idcita
          INNER join bdhistoriasclinicas.dbo.hcl_poblacion hp on hp.idpoblacion = hc.idpoblacion  
          INNER join bdhistoriasclinicas.dbo.hcl_cuaderno hc2 on hc2.idCuaderno = ffp.idcuaderno
          INNER join bdhistoriasclinicas.dbo.hcl_personal_salud hps on hps.idpersonalmedico = ffp.idpersonal
          WHERE hc.cit_fecha_ini >= @fecha_inicial
          AND hc.cit_fecha_ini <  @fecha_final
          AND hc.cit_observaciones = @tipo
          AND hc.idcuaderno =@consultorio_id
          AND ffp.idestablecimiento = @establecimiento_id
          AND ffp.fip_estado <> 'T'
          order by hc.cit_fecha_ini;`);

      return data.recordset;
    }
  }
}
