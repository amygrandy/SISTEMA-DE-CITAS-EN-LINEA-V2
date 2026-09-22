import { GetAllEspecialidadUseCase } from './use-case/get-all-SIAIS.use-case.js';
import { GetSelectSIAISUseCase } from './use-case/get-select-SIAIS.use-case.js';
import { GetIdSIAISUseCase } from './use-case/get-id-SIAIS.use-case.js';
import { CreateUseCase } from './use-case/create.use-case.js';
import { GetAllUseCase } from './use-case/get-all.use-case.js';
import { ChangeTipoConsultorioUseCase } from './use-case/changeTipoConsultorio.use-case.js';
import { ChangeStatusUseCase } from './use-case/change-status.use-case.js';

export class ConsultorioController {
  static async getAll(req, res) {
    const data = await GetAllUseCase.execute({});
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente consultorio',
      data,
    });
  }
  static async getAllSIAIS(req, res) {
    const data = await GetAllEspecialidadUseCase.execute({
      queryEstablecimiento: req.query.establecimiento_id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente consultorio',
      data,
    });
  }
  static async getAllSelectSIAIS(req, res) {
    const data = await GetSelectSIAISUseCase.execute({
      queryEstablecimiento: req.query.establecimiento_id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los cosultorios del SIAIS',
      data,
    });
  }
  static async getIdSIAIS(req, res) {
    const data = await GetIdSIAISUseCase.execute({
      consultorio_id: req.validated.params.id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente el cosultorio del SIAIS',
      data,
    });
  }
  static async create(req, res) {
    const data = await CreateUseCase.execute({
      payload: req.validated.body,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se creo correctamente el cosultorio',
      data,
    });
  }
  static async changeTipoConsultorio(req, res) {
    const data = await ChangeTipoConsultorioUseCase.execute({
      id: req.validated.params.id,
      payload: req.validated.body,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se acualizo correctamente el cosultorio',
      data,
    });
  }
  static async ChangeStatus(req, res) {
    const data = await ChangeStatusUseCase.execute({
      id: req.validated.params.id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se cambio el estado correctamente el cosultorio',
      data,
    });
  }
}
