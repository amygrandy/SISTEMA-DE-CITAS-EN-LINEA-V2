class CreateRolUseCase {
  constructor(RolRepository) {
    this.RolRepository = RolRepository;
  }
  async execute(payload) {
    const rolName = await this.RolRepository.getByName(payload.nombre_rol);
    if (rolName) {
      const err = new Error('Ya existe un rol con ese nombre');
      err.statusCode = 409;
      throw err;
    }
    return this.RolRepository.create(payload);
  }
}
export default CreateRolUseCase;
