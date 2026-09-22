class GetAllRolesUseCase {
  constructor(RolRepository) {
    this.RolRepository = RolRepository;
  }
  async execute() {
    return this.RolRepository.getAll();
  }
}

export default GetAllRolesUseCase;
