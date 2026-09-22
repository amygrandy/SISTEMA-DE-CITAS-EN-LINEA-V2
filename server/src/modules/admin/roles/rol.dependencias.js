import RolRepository from './rol.respository.js';
import GetAllRolesUseCase from './use-cases/get-all-roles.use-cases.js';
import GetRolUseCase from './use-cases/get-rol.use-case.js';
import CreateRolUseCase from './use-cases/create-rol.use-case.js';
import UpdateRolUseCase from './use-cases/update-rol.use-case.js';
import RolController from './rol.controller.js';

const rolRepository = new RolRepository();

const getAllRolesUseCase = new GetAllRolesUseCase(rolRepository);
const createRolUseCase = new CreateRolUseCase(rolRepository);
const getRolUseCase = new GetRolUseCase(rolRepository);
const updateRolUseCase = new UpdateRolUseCase(rolRepository);

const rolController = new RolController({
  getAllRolesUseCase,
  createRolUseCase,
  getRolUseCase,
  updateRolUseCase,
});

export { rolController };
