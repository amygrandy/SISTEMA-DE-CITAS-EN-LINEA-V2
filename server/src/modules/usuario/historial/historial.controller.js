import { HistorialUseCase } from './use-case/historal.use-case.js';
import { GetFichasRangoFechasUseCase } from './use-case/get-fichas-rango-fechas.use-case.js';

export class HistorialController {
  static async getHistorial(req, res) {
    const data = await HistorialUseCase.execute({
      id: req.validated.params.id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente el historial',
      data,
    });
  }
  static async getFichasRangoFechas(req, res) {
    const data = await GetFichasRangoFechasUseCase.execute({
      matricula: req.usuario.matricula,
      fecha_ini: req.validated.body.fecha_ini,
    });

    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente las fichas',
      data,
    });
  }
}
