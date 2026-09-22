import AseguradoRepository from './asegurado.repository.js';
//
import GetAseguradosUseCase from './get-asegurados.use-case.js';

import AseguradosController from './asegurados.controller.js';

const aseguradoRepository = new AseguradoRepository();

const getAseguradosUseCase = new GetAseguradosUseCase({ aseguradoRepository });

const aseguradosController = new AseguradosController({ getAseguradosUseCase });

export { aseguradosController };
