class PoblacionController {
  constructor({ getAseguradoTitularUseCase }) {
    this.getAseguradoTitularUseCase = getAseguradoTitularUseCase;
  }
  async getAseguradoTitular(req, res) {
    const data = await this.getAseguradoTitularUseCase.execute(req.body);
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente el asgurado titular',
      data,
    });
  }
  async getMe(req, res) {
    const data = req.usuario;
    console.log('Llego aca');
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente el asgurado titular',
      data,
    });
  }
}
export default PoblacionController;
