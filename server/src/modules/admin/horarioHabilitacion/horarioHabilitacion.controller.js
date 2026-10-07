import { UpdateUseCase } from './use-case/update.use-case.js';
import { GetById } from './use-case/get-id.use-case.js';
import { HorarioHabilitacionRespository } from './horarioHabilitacion.repository.js';

export class HorarioHabilitacionController {
  static async update(req, res) {
    const data = await UpdateUseCase.execute({
      payload: req.validated.body,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamene el horario',
      data,
    });
  }
  static async getById(req, res) {
    const data = await GetById.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamene el horario',
      data,
    });
  }
  static async getHoraActual(req, res) {
    const data = await HorarioHabilitacionRespository.EstaHabilitado();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamene el hoario',
      data,
    });
  }
}
