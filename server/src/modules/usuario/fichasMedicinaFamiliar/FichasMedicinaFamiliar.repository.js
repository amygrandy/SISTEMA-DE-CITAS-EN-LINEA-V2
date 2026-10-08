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
        WHERE ffpp.fecha > @fecha_inicial
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

      SELECT TOP 20
          ffp.idfichaprogramada,
          LTRIM(RTRIM(hps.per_nombre)) + ' ' +
          LTRIM(RTRIM(hps.per_campo1)) + ' ' +
          LTRIM(RTRIM(hps.per_campo2)) AS medico,
          LTRIM(RTRIM(hc.cua_nombre)) AS consultorio,
          ffp.fip_fecha_ini,
          CASE ffp.fip_estado
              WHEN 'L' THEN 'Libre'
              WHEN 'A' THEN 'FALTA'
              WHEN 'T' THEN 'ATENDIDO'
              WHEN 'N' THEN 'FALTA'
              WHEN 'V' THEN 'FALTA'
              WHEN 'D' THEN 'FALTA'
              WHEN 'M' THEN 'FALTA'
              WHEN 'R' THEN 'FALTA'
              ELSE 'Desconocido'
          END AS estado_descripcion,
          LTRIM(RTRIM(hee.est_nombre)) AS establecimiento
      FROM bdfichas.dbo.fic_fichas_programadas ffp,
          bdhistoriasclinicas.dbo.hcl_personal_salud hps,
          bdhistoriasclinicas.dbo.hcl_cuaderno hc,
          bdhistoriasclinicas.dbo.hcl_citas hhh,
          bdhistoriasclinicas.dbo.hcl_poblacion hpn,
          bdhistoriasclinicas.dbo.hcl_establecimiento hee
      WHERE hps.idpersonalmedico = ffp.idpersonal
        AND hc.idCuaderno = ffp.idcuaderno
        AND hhh.idcita = ffp.idcita
        AND hpn.idpoblacion = hhh.idpoblacion
        AND hee.idestablecimiento = hhh.idestablecimiento
        AND hpn.idpoblacion = @id
        AND ffp.fip_fecha_ini >= @fecha
      ORDER BY ffp.fip_fecha_ini ASC;`);

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
}
