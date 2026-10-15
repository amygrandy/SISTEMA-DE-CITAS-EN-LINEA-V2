import { getAllByConsultorioByMedicoUseCase } from './use-case/get-all-by-consultorio-by-medico.use-case.js';

export class ReporteController {
  static async getAllByConsultorioByMedico(req, res) {
    const data = await getAllByConsultorioByMedicoUseCase.execute({
      consultorio_id: req.validated.body.consultorio_id,
      establecimiento_id: req.validated.body.establecimiento_id,
      fecha_final: req.validated.body.fecha_final,
      fecha_inicial: req.validated.body.fecha_inicial,
      tipo_cita: req.validated.body.tipo_cita,
      estado: req.validated.body.estado,
    });

    return res
      .status(200)
      .json({ ok: true, message: 'Se obtuvo correctamente los datos', data });
  }
}
