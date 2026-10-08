import { GetFichasHistorialUseCase } from './use-case/get-fichas-historial.use-case.js';
import { GetFechasByCuadernoUseCase } from './use-case/get-fechas-cuaderno.use-case.js';
import { getHorariasByFechaByCuadernoUseCase } from './use-case/get-horarios-cuaderno-fecha.use-case.js';
import { ReservarFichaUseCase } from './use-case/reservar-ficha.use-case.js';
import { GetFichasProgramadasUseCase } from './use-case/get-fichas-programadas.use-case.js';
import { GetByIdUseCase } from './use-case/get-id.use-case.js';

export class FichasMedicinaFamiliarController {
  static async getFichasLibres(req, res) {
    const data = await GetFichasHistorialUseCase.execute(req.body);
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo el historial correctamente',
      data,
    });
  }
  static async GetFechasByCuaderno(req, res) {
    const data = await GetFechasByCuadernoUseCase.execute({
      payload: req.validated.body,
    });

    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente las fechas',
      data,
    });
  }
  static async getHorariosByFechaByCuaderno(req, res) {
    const data = await getHorariasByFechaByCuadernoUseCase.execute({
      fecha: req.validated.body.fecha,
      idCuaderno: req.validated.body.idCuaderno,
      idEstablecimiento: req.validated.body.idEstablecimiento,
    });

    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente las fechas',
      data,
    });
  }
  static async reservarFicha(req, res) {
    console.log('************');
    console.log(req.validated);
    console.log('************');

    const data = await ReservarFichaUseCase.execute({
      cedula_identidad: req.validated.body.cedula_identidad,
      consultorio: req.validated.body.consultorio,
      cuaderno_id: req.validated.body.cuaderno_id,
      establecieminto: req.validated.body.establecieminto,
      establecimiento_id: req.validated.body.establecimiento_id,
      fecha: req.validated.body.fecha,
      fecha_final: req.validated.body.fecha_final,
      fecha_ini: req.validated.body.fecha_ini,
      idcobertura: req.validated.body.idcobertura,
      idfichaprogramada: req.validated.body.idfichaprogramada,
      nombre_completo: req.validated.body.nombre_completo,
      personal_id: req.validated.body.personal_id,
      poblacion_id: req.validated.body.poblacion_id,
      codigo_asegurado: req.validated.body.codigo_asegurado,
      codigo: req.validated.body.codigo,
      nombre_doctor: req.validated.body.nombre_doctor,
      matricula: req.validated.body.matricula,
      fechaAtencion: req.validated.body.fechaAtencion,
    });

    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente las fechas',
      data,
    });
  }
  static async getFichasProgramadas(req, res) {
    const data = await GetFichasProgramadasUseCase.execute({
      id: req.validated.params.id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente las fichas programadas',
      data,
    });
  }
  static async getById(req, res) {
    const data = await GetByIdUseCase.execute({ id: req.validated.params.id });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente las ficha programadas',
      data,
    });
  }
}
