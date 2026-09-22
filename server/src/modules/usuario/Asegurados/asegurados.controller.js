class AseguradoController {
  constructor({ getAseguradosUseCase }) {
    this.getAseguradosUseCase = getAseguradosUseCase;
  }
  async getAsegurados(req, res) {
    const usuario = req.usuario;
    const data = await this.getAseguradosUseCase.execute({
      matricula: usuario.matricula,
    });

    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los asegurado',
      data,
    });
  }
}

export default AseguradoController;
