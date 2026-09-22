'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('establecimientos', [
      {
        idestablecimiento: 2,
        nombre_establecimiento: 'CENTRO CENTINELA ANEXO N° 32',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 3,
        nombre_establecimiento: 'CIMFA VILLA GALINDO',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 4,
        nombre_establecimiento: 'CIMFA QUILLACOLLO',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 5,
        nombre_establecimiento: 'CIS SACABA',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 6,
        nombre_establecimiento: 'CIS PUNATA',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 8,
        nombre_establecimiento: 'KAMI',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 9,
        nombre_establecimiento: 'JUDICATURA',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 10,
        nombre_establecimiento: 'CIS AIQUILE',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 11,
        nombre_establecimiento: 'POL. VILLA TUNARI',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 12,
        nombre_establecimiento: 'PTO. MEDICO COBOCE',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 13,
        nombre_establecimiento: 'CIMFA SUR',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 14,
        nombre_establecimiento: 'CIS SARCOBAMBA',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 112,
        nombre_establecimiento: 'HOSPITAL OBRERO NRO 2',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 113,
        nombre_establecimiento: 'PAISE 32',
        createdAt: now,
        updatedAt: now,
      },
      {
        idestablecimiento: 120,
        nombre_establecimiento: 'CIMFA 64',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('establecimientos', null, {});
  },
};
