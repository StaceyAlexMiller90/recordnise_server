'use strict';
module.exports = (sequelize, DataTypes) => {
  const record = sequelize.define(
    'record', 
    {
      artist: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      style: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      format: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      lowestPrice: {
        type: DataTypes.INTEGER,
      },
      discogsId: {
        type: DataTypes.INTEGER,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    }, {});
  record.associate = function(models) {
    record.belongsToMany(models.user, {
      through: 'collectionItems',
      foreignKey: 'userId'
    })
  };
  return record;
};