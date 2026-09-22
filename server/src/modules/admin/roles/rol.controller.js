class RolController {
  constructor({
    createRolUseCase,
    getAllRolesUseCase,
    getRolUseCase,
    updateRolUseCase,
    getRolNameUseCase,
  }) {
    this.getRolUseCase = getRolUseCase;
    this.getAllRolesUseCase = getAllRolesUseCase;
    this.getRolNameUseCase = getRolNameUseCase;
    this.createRolUseCase = createRolUseCase;
    this.updateRolUseCase = updateRolUseCase;
  }
  async getAllRoles(req, res) {
    const data = await this.getAllRolesUseCase.execute();
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente los roles',
      data,
    });
  }
  async getById(req, res) {
    const data = await this.getRolUseCase.execute(req.params.id);
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente el rol',
      data,
    });
  }
  async getByName(req, res) {
    const data = await this.getRolNameUseCase.execute(req.params.body);
    return res.status(200).json({
      ok: true,
      message: 'Se obtuvo correctamente el rol',
      data,
    });
  }
  async create(req, res) {
    const data = await this.createRolUseCase.execute(req.body);
    return res.status(200).json({
      ok: true,
      message: 'Se creo correctamente el rol',
      data,
    });
  }
  async update(req, ers) {
    const data = await this.updateRolUseCase.execute(
      req.params.id,
      req.payload,
    );
    return res.status(200).json({
      ok: true,
      message: 'Se actualizo correctamente el rol',
      data,
    });
  }
}

export default RolController;
