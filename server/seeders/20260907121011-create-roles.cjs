'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        nombre_rol: 'super_admin',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        nombre_rol: 'paciente',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
