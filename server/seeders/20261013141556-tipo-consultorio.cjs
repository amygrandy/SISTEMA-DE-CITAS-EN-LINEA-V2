'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const now = new Date();
    await queryInterface.bulkInsert('tipos_consultorio', [
      {
        id: 1,
        nombre_tipo: 'MEDICINA FAMILIAR',
        estado: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        nombre_tipo: 'ODONTOLOGIA',
        estado: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        nombre_tipo: 'PEDIATRIA',
        estado: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        nombre_tipo: 'GINECOLOGIA',
        estado: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('tipos_consultorio', null, {});
  },
};
