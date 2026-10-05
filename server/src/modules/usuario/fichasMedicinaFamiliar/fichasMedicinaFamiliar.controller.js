import { GetFichasHistorialUseCase } from './use-case/get-fichas-historial.use-case.js';
import { GetFechasByCuadernoUseCase } from './use-case/get-fechas-cuaderno.use-case.js';

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
}
