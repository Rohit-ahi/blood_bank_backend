'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DonorInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DOB: {
        type: Sequelize.DATE,
      },
      bloodGroup: {
        type: Sequelize.STRING,
        allowNull: false
      },
      loc_lat: {
        type: Sequelize.FLOAT
      },
      loc_long: {
        type: Sequelize.FLOAT
      },
      tracker_area: {
        type: Sequelize.FLOAT
      },
      user : {
        type: Sequelize.INTEGER,
        allowNull:false,
        references : {
          model : "Users" , key : "id"
        }
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
    await queryInterface.dropTable('DonorInfos');
  }
};