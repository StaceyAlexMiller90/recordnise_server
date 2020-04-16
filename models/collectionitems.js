'use strict';
module.exports = (sequelize, DataTypes) => {
  const collectionItems = sequelize.define(
    'collectionItems', 
    {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recordId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  collectionItems.associate = function(models) {
    collectionItems.belongsTo(models.user, {foreignKey: 'userId'})
    collectionItems.belongsTo(models.record, {foreignKey: 'recordId'})
  };
  return collectionItems;
};