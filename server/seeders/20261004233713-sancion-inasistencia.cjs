'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('control_inasistencias', [
      {
        id: 1,
        cantidad_inasistencia: 3,
        rango_dias: 6,
        sancion_dias: 1,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('control_inasistencias', null, {});
  },
};
