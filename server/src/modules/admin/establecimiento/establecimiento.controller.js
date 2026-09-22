import { GetAllSIAISUseCase } from './use-cases/get-all-SIAIS.use-case.js';
import { GetSelectUseCase } from './use-cases/get-select.use-case.js';
import { GetAllUseCase } from './use-cases/get-all.use-case.js';

export class EstablecimientoController {
  static async getAllEstablecimientoSIAIS(req, res) {
    const data = await GetAllSIAISUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los establecimientos',
      data,
    });
  }
  static async getAll(req, res) {
    const data = await GetAllUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los establecimientos',
      data,
    });
  }
  static async getSelect(req, res) {
    const data = await GetSelectUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los establecimientos',
      data,
    });
  }
}
