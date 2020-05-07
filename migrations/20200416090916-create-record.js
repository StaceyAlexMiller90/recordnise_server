'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      artist: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      genre: {
        type: Sequelize.STRING,
      },
      style: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      format: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lowestPrice: {
        type: Sequelize.INTEGER,
      },
      discogsId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('records')
  },
}
