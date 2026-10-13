import { GetAllUseCase } from './use-case/get-all.use-case.js';
import { CreateUseCase } from './use-case/create.use-case.js';
import { UpdateUseCase } from './use-case/update.use-case.js';
import { ChangeStatusUseCase } from './use-case/change-status.use-case.js';
import { GetSelectUseCase } from './use-case/get-select.use-case.js';
import { GetSelectUsuarioUseCase } from './use-case/get-select-usuario.use-case.js';

export class TipoConsultorioController {
  static async getAll(req, res) {
    const data = await GetAllUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los tipos de consultorio',
      data,
    });
  }
  static async create(req, res) {
    const payload = req.validated.body;
    const data = await CreateUseCase.execute({ payload });
    return res.status(200).json({
      ok: true,
      message: 'Se creo correctamente el tipo de consultorio',
      data,
    });
  }
  static async update(req, res) {
    const data = await UpdateUseCase.execute({
      id: req.validated.params.id,
      payload: req.validated.body,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se actualizo correctamente el tipo de consultorio',
      data,
    });
  }
  static async changeStatus(req, res) {
    const data = await ChangeStatusUseCase.execute({
      id: req.validated.params.id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se actualizo correctamente el tipo de consultorio',
      data,
    });
  }
  static async getSelect(req, res) {
    const data = await GetSelectUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los tipos de consultorio',
      data,
    });
  }
  static async getSelectUsuario(req, res) {
    const data = await GetSelectUsuarioUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los tipos de consultorio',
      data,
    });
  }
}
