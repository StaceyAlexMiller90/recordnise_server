'use strict';
module.exports = (sequelize, DataTypes) => {
  const record = sequelize.define(
    'record', 
    {
      artistName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recordName: {
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
      yearReleased: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      coverArtwork: {
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