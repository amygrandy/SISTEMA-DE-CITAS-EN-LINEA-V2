'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('horario_habilitacion', [
      {
        id: 1,
        hora_inicio: '05:00:00',
        hora_final: '20:00:00',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'horario_habilitacion',
      {
        id: 1,
      },
      {},
    );
  },
};
