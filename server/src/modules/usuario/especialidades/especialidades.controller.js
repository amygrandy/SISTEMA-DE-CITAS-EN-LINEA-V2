import { GetConsultorioByEspecialidadUseCase } from './use-case/get-consultorios-especialidad.use-case.js';

export class EspecialidadesController {
  static async GetConsultorioByEspecialidad(req, res) {
    const data = await GetConsultorioByEspecialidadUseCase.execute({
      establecimiento_id: req.validated.body.establecimiento_id,
      tipo_consultorio_id: req.validated.body.tipo_consultorio_id,
    });
    return res.status(200).json({
      ok: true,
      message: 'Se pudo obtener correctamente los consultorios',
      data,
    });
  }
}
