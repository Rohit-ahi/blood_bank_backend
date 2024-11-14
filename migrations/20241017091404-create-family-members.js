'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FamilyMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull:false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull:false
      },
      DOB: {
        type: Sequelize.DATE,
        allowNull:false
      },
      bloodGroup: {
        type: Sequelize.STRING,
        allowNull:false
      },
      relation: {
        type: Sequelize.STRING,
        allowNull:false
      },
      user : {
        type: Sequelize.INTEGER,
        allowNull:false,
        references : {
          model : "Users" , key : "id"
        }},
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
    await queryInterface.dropTable('FamilyMembers');
  }
};