class UpdateRolUseCase {
  constructor(RolRepository) {
    this.RolRepository = RolRepository;
  }
  async execute(id, payload) {
    const data = await this.RolRepository.update(id, payload);
    if (!data) {
      const err = new Error('No se encontro el rol');
      err.statusCode = 404;
      throw err;
    }
    return data;
  }
}
export default UpdateRolUseCase;
