'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicitudes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estudiante: {
        type: Sequelize.STRING
      },
      curso: {
        type: Sequelize.STRING
      },
      seccion: {
        type: Sequelize.STRING
      },
      turno: {
        type: Sequelize.STRING
      },
      periodo: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      tipo: {
        type: Sequelize.STRING
      },
      representante: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('solicitudes');
  }
};