import { GetAllUseCase } from './use-case/get-all.use-case.js';
import { CreateUseCase } from './use-case/create.use-case.js';
import { GetIdUseCase } from './use-case/get-id.use-case.js';
import { UpdateUseCase } from './use-case/update.use-case.js';
import { CosultorioByOdontologiaUseCase } from './use-case/consulotrio-for-odontologia.use-case.js';

export class ZonificacionConsultorioController {
  static async getAll(req, res) {
    const data = await GetAllUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente la zonificacion',
      data,
    });
  }
  static async getId(req, res) {
    const data = await GetIdUseCase.execute({ id: req.validated.params.id });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente la zonificacion',
      data,
    });
  }
  static async create(req, res) {
    const data = await CreateUseCase.execute({ payload: req.validated.body });
    return res.status(200).json({
      ok: true,
      message: 'Se creo correctamente la zonificacion',
      data,
    });
  }
  static async update(req, res) {
    const data = await UpdateUseCase.execute({
      id: req.validated.params.id,
      payload: req.validated.body.consultorioCabecera,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se actualizo correctamente la zonificacion',
      data,
    });
  }
  static async CosultorioByOdontologia(req, res) {
    const data = await CosultorioByOdontologiaUseCase.execute({
      cuaderno_id: req.validated.params.id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente el consultorio de odontologia',
      data,
    });
  }
}
