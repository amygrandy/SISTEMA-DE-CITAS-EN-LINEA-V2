import { getConnection, sql } from '../../../sqlserverSIAIS/database.js';
import { Op } from 'sequelize';
import { FichaWebModel } from '../../../models/fichaWeb.model.js';

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
  static async getFichasProgramadasLocal({ cuaderno_id, poblacion_id }) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate());

    const fechaManana = [
      fecha.getFullYear(),
      String(fecha.getMonth() + 1).padStart(2, '0'),
      String(fecha.getDate()).padStart(2, '0'),
    ].join('-');

    const data = await FichaWebModel.findAll({
      attributes: [
        'id',
        'fecha',
        'fecha_ini',
        'nombre_completo',
        'cedula_identidad',
        'cuaderno_id',
        'consultorio',
        'establecieminto',
        'nombre_doctor',
      ],
      where: {
        fecha: {
          [Op.gte]: fechaManana,
        },
        cuaderno_id,
        poblacion_id,
        asistio_a_la_cita: 'POR_ASISTIR',
      },
    });
    return data;
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
        WHERE ffpp.fecha >= @fecha_inicial
          AND ffpp.fecha <= @fecha_final
          AND ffpp.idcuaderno = @idCuaderno
          AND ffpp.idestablecimiento = @idEstablecimiento
        ORDER BY ffpp.fecha;
    `);

    return data.recordset.map((item) => ({
      ...item,
      fecha: item.fecha.toISOString().split('T')[0],
    }));
  }
  static async getHorariasByFechaByCuaderno({
    fecha = '2026-09-28',
    idCuaderno = '10130',
    idEstablecimiento = '4',
    limite = 0,
  } = {}) {
    if (limite == 0) {
      return [];
    }
    const pool = await getConnection();

    const data = await pool
      .request()
      .input('fecha', sql.Date, fecha)
      .input('idCuaderno', sql.Int, idCuaderno)
      .input('idEstablecimiento', sql.Int, idEstablecimiento)
      .input('limite', sql.Int, limite).query(`
      SET LANGUAGE Spanish;
      SET DATEFORMAT dmy;

        SELECT top (@limite)  ffpp.idfichaprogramada,ffpp.fip_fecha_ini,
        ffpp.fip_hora_fin,ffpp.fip_estado, ffp.idpersonal, 
        LTRIM(RTRIM(hps.per_nombre))+ ' '+LTRIM(RTRIM(hps.per_campo1)) +' '+LTRIM(RTRIM(hps.per_campo2)) as nombre_personal_salud,
        ffp.fip_numero 
        FROM bdfichas.dbo.fic_fichas_programadas_pantalla ffpp
        INNER JOIN bdfichas.dbo.fic_fichas_programadas ffp on ffp.idfichaprogramada = ffpp.idfichaprogramada
        INNER JOIN bdhistoriasclinicas.dbo.hcl_personal_salud hps on hps.idpersonalmedico = ffp.idpersonal  
        WHERE ffpp.fecha  = @fecha
        and ffpp.fip_estado ='Disponible'
        and ffpp.idcuaderno =@idCuaderno
        and ffpp.idestablecimiento =@idEstablecimiento
        order by ffpp.fip_fecha_ini DESC;`);

    return data.recordset.map((row) => ({
      ...row,
      fecha_ini: row.fip_fecha_ini,
      fip_hora_fin: row.fip_hora_fin,
      fip_fecha_ini: row.fip_fecha_ini.toISOString().slice(11, 16),
    }));
  }
  static async reservarFicha({
    idfichaprogramada,
    origen,
    paciente,
    idusuario,
    descripcionUsuario,
    fecha_ini,
    fecha_fin,
    especialidad,
    idMedico,
    idEstablecimiento,
    cobertura,
  }) {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('idfichaprogramada', sql.Int, idfichaprogramada)
      .input('origen', sql.Int, origen)
      .input('paciente', sql.Int, paciente)
      .input('idusuario', sql.Int, idusuario)
      .input('descripcionUsuario', sql.VarChar(70), descripcionUsuario)
      .input('fecha_ini', sql.DateTime, fecha_ini)
      .input('fecha_fin', sql.DateTime, fecha_fin)
      .input('especialidad', sql.Int, especialidad)
      .input('idMedico', sql.Int, idMedico)
      .input('idEstablecimiento', sql.Int, idEstablecimiento)
      .input('cobertura', sql.Int, cobertura)
      .execute('dbo.ficha_a_reservar');

    return {
      codigo: result.returnValue,
      data: result.recordset ?? [],
    };
  }
  static async getFichasProgramadas({ id, fecha }) {
    const pool = await getConnection();

    const data = await pool
      .request()
      .input('id', sql.Int, id)
      .input('fecha', sql.Date, fecha).query(`
      SET LANGUAGE Spanish;
      SET DATEFORMAT dmy;

      select top 20 ffp.idfichaprogramada ,LTRIM(RTRIM(hc.cua_nombre)) as consultorio,
      LTRIM(RTRIM(hps.per_nombre)) +' '+LTRIM(RTRIM(hps.per_campo1))+' '+LTRIM(RTRIM(hps.per_campo2)) as nombre_medico,
      hc.cua_sigla, ffp.fip_numero, ffp.fip_fecha_ini ,hc2.cit_fecha_reserva,LTRIM(RTRIM(he.est_nombre)) as establecimiento,
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
                END AS estado_descripcion
      from bdhistoriasclinicas.dbo.hcl_cuaderno hc 
      inner join bdhistoriasclinicas.dbo.hcl_citas hc2 on hc2.idcuaderno = hc.idCuaderno 
      inner join bdfichas.dbo.fic_fichas_programadas ffp on ffp.idcita = hc2.idcita 
      INNER join bdhistoriasclinicas.dbo.hcl_personal_salud hps on hps.idpersonalmedico= ffp.idpersonal
      inner join bdhistoriasclinicas.dbo.hcl_poblacion hp on hp.idpoblacion = hc2.idpoblacion 
      INNER JOIN bdhistoriasclinicas.dbo.hcl_establecimiento he on he.idestablecimiento = ffp.idestablecimiento  
      WHERE ffp.fip_fecha_ini >= @fecha
      and hp.idpoblacion = @id`);

    return data.recordsets[0];
  }
  static async getById({ id, transaction = null }) {
    const data = await FichaWebModel.findOne({
      where: {
        idfichaprogramada: id,
      },
      transaction,
      raw: true,
    });
    if (!data) {
      return null;
    }
    return data;
  }
  static async getFichaByFecha({ poblacion_id, fecha }) {
    const pool = await getConnection();

    const fechaSQL = fecha.replaceAll('-', '');

    const data = await pool
      .request()
      .input('poblacion_id', sql.Int, poblacion_id)
      .input('fecha', sql.VarChar(8), fechaSQL).query(`
      SET LANGUAGE Spanish;
      SET DATEFORMAT dmy;

      SELECT
        ffp.*,
        hc.idpoblacion
      FROM bdfichas.dbo.fic_fichas_programadas AS ffp

      INNER JOIN bdhistoriasclinicas.dbo.hcl_citas AS hc
        ON hc.idcita = ffp.idcita

      INNER JOIN bdhistoriasclinicas.dbo.hcl_poblacion AS hp
        ON hp.idpoblacion = hc.idpoblacion

      WHERE hp.idpoblacion = @poblacion_id

        AND ffp.fip_fecha_ini >= CONVERT(DATETIME, @fecha, 112)
        AND ffp.fip_fecha_ini < DATEADD(
          DAY,
          1,
          CONVERT(DATETIME, @fecha, 112)
        );`);

    return data.recordset;
  }
  static async removerFicha({ idfichaprogramada }) {
    const pool = await getConnection();

    try {
      const request = pool.request();

      request.input('i_operacion', sql.Char(1), 'A');
      request.input('i_idfichaprogramada', sql.Int, idfichaprogramada);
      request.input('i_datos_eliminador', sql.VarChar(200), 'Desde la web');

      const result = await request.query(`
      EXEC bdfichas.dbo.proc_anula_ficha_enlinea
        @i_operacion = @i_operacion,
        @i_idfichaprogramada = @i_idfichaprogramada,
        @i_datos_eliminador = @i_datos_eliminador;
    `);

      // console.log('****************');
      // console.log(result);
      // console.log('****************');

      // console.log('Resultado del procedimiento:', {
      //   returnValue: result.returnValue,
      //   rowsAffected: result.rowsAffected,
      //   recordsets: result.recordsets,
      // });
      // console.log('Lo que me devuelve');
      // console.log(result);
      // console.log('******************');
      return;
      // {
      //   ok: result.returnValue === 0,
      //   rowsAffected: result.rowsAffected,
      // }
    } catch (error) {
      console.error('Error al ejecutar proc_anula_ficha_enlinea:', {
        message: error.message,
        code: error.code,
        number: error.number,
        procedure: error.procName,
        precedingErrors: error.precedingErrors?.map((e) => ({
          message: e.message,
          number: e.number,
          lineNumber: e.lineNumber,
        })),
      });

      throw error;
    }
  }
  static async getByIdFicha({ id }) {
    const pool = await getConnection();
    const request = pool.request();

    request.input('idfichaprogramada', sql.Int, id);

    const data = await request.query(`
      SELECT ffp.idfichaprogramada, ffp.fip_fecha_ini as fecha_ini, ffp.fip_hora_fin as hora_fin,
      LTRIM(RTRIM(hp.pac_numero_historia)) as codigo_asegurado,LTRIM(RTRIM( hp.pac_codigo)) as codigo_matricula, hp.idpoblacion as poblacion_id,
      hp.pac_documento_id as cedula_identidad, 
      LTRIM(RTRIM(hp.pac_nombre))+' '+LTRIM(RTRIM(hp.pac_primer_apellido))+' '+LTRIM(RTRIM(hp.pac_segundo_apellido)) as nombre_completo,
      hc2.idCuaderno as cuaderno_id,LTRIM(RTRIM( hc2.cua_nombre)) as consultorio, hc.idpersonal as personal_id, 
      he.idestablecimiento as establecimiento_id,LTRIM(RTRIM(he.est_nombre)) as establecieminto,
      LTRIM(RTRIM(hps.per_nombre)) + ' '+LTRIM(RTRIM(hps.per_campo1))+' '+LTRIM(RTRIM(hps.per_campo2)) as nombre_doctor,
      CASE ffp.fip_estado
      WHEN 'L' THEN 'Libre'
      WHEN 'A' THEN 'Sacado en vigencia'
      WHEN 'N' THEN 'No atendido Falta'
      WHEN 'V' THEN 'Visita a domicilio'
      WHEN 'D' THEN 'No acude el paciente Falta'
      WHEN 'M' THEN 'Reconsulta Medico'
      when 'R' then 'Sacado desde la web'
      ELSE 'Desconocido'
      END AS origen
      FROM bdhistoriasclinicas.dbo.hcl_citas hc 
      INNER JOIN bdhistoriasclinicas.dbo.hcl_cuaderno hc2 on hc.idcuaderno = hc2.idCuaderno 
      INNER JOIN bdhistoriasclinicas.dbo.hcl_personal_salud hps on hc.idpersonal = hps.idpersonalmedico
      INNER JOIN bdhistoriasclinicas.dbo.hcl_poblacion hp on hc.idpoblacion = hp.idpoblacion 
      INNER JOIN bdhistoriasclinicas.dbo.hcl_establecimiento he on hc.idestablecimiento = he.idestablecimiento
      INNER JOIN bdfichas.dbo.fic_fichas_programadas ffp on ffp.idcita = hc.idcita 
      WHERE ffp.idfichaprogramada =@idfichaprogramada;`);

    if (data.recordset[0].length == 0) {
      return null;
    }

    return data.recordset[0];
  }
  static async getCountFichas({ matricula_asegurado, fecha_ini, fecha_final }) {
    const pool = await getConnection();
    const request = pool.request();

    request.input('matricula', sql.VarChar, matricula_asegurado);
    request.input('fecha_ini', sql.VarChar, fecha_ini);
    request.input('fecha_final', sql.VarChar, fecha_final);

    const data = await request.query(`
      SELECT COUNT(*) AS cantidad_fichas
      FROM bdhistoriasclinicas.dbo.hcl_poblacion hp
      INNER JOIN bdhistoriasclinicas.dbo.hcl_citas hc
          ON hp.idpoblacion = hc.idpoblacion
      INNER JOIN bdfichas.dbo.fic_fichas_programadas ffp
          ON ffp.idcita = hc.idcita
      WHERE hp.pac_numero_historia = @matricula
        AND ffp.fip_fecha_ini >= @fecha_ini
        AND ffp.fip_fecha_ini < @fecha_final;
      `);

    if (data.recordset[0].length == 0) {
      return null;
    }

    // console.log('********repository*****************');
    // console.log(data.recordset);
    // console.log('*************************');

    return data.recordset[0];
  }

  static async cantidadFaltas({ matricula }) {
    const pool = await getConnection();
    const request = pool.request();

    request.input('matricula', sql.VarChar, matricula_asegurado);
    request.input('fecha_ini', sql.VarChar, fecha_ini);
    request.input('fecha_final', sql.VarChar, fecha_final);

    const data = await request.query(`
       SELECT COUNT(*) AS total_no_atendidos
        FROM bdfichas.dbo.fic_fichas_programadas ffp 
        INNER JOIN bdhistoriasclinicas.dbo.hcl_citas hc on hc.idcita =ffp.idcita
        INNER JOIN bdhistoriasclinicas.dbo.hcl_poblacion hp on hp.idpoblacion = hc.idpoblacion
        INNER JOIN bdhistoriasclinicas.dbo.hcl_cuaderno hc2 on hc2.idCuaderno = ffp.idcuaderno 
        INNER JOIN bdhistoriasclinicas.dbo.hcl_personal_salud hps on hps.idpersonalmedico = ffp.idpersonal 
        WHERE hp.pac_numero_historia  = @matricula
        AND ffp.fip_fecha_ini >= @fecha_ini
        AND ffp.fip_fecha_ini < @fecha_final
        AND ffp.fip_estado <> 'T';
      `);

    if (data.recordset[0].length == 0) {
      return null;
    }

    return data.recordset[0];
  }
}
