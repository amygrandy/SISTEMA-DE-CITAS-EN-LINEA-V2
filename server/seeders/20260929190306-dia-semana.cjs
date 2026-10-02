'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('dias_semana', [
      {
        dia: 'LUNES',
        numero: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        dia: 'MARTES',
        numero: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        dia: 'MIERCOLES',
        numero: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        dia: 'JUEVES',
        numero: 4,
        createdAt: now,
        updatedAt: now,
      },
      {
        dia: 'VIERNES',
        numero: 5,
        createdAt: now,
        updatedAt: now,
      },
      {
        dia: 'SABADO',
        numero: 6,
        createdAt: now,
        updatedAt: now,
      },
      {
        dia: 'DOMINGO',
        numero: 0,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dias_semana', null, {});
  },
};
