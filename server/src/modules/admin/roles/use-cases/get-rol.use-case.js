class GetRolUseCase {
  constructor(RolRepository) {
    this.RolRepository = RolRepository;
  }
  async execute(id) {
    const data = await this.RolRepository.findById(id);
    if (!data) {
      const error = new Error('El socio ya existe');
      error.statusCode = 404;
      throw error;
    }
    return data;
  }
}

export default GetRolUseCase;
