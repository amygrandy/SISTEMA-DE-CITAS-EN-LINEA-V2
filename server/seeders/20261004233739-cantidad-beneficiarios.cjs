'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('cantidad_beneficiarios', [
      {
        id: 1,
        cantidad_ficha_por_asgurado: 3,
        dias_espera_ficha: 1,
        tiempo_para_cancelar_ficha: 30,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cantidad_beneficiarios', null, {});
  },
};
