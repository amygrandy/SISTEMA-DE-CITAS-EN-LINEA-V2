'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const contraseniaHash = await bcrypt.hash('Cns2026Fichas#$&', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        nombre_usuario: 'cns_fichas_admin',
        contrasenia: contraseniaHash,
        rol_id: 1,
        estado: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
