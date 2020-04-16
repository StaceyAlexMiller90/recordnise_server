"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  user.associate = function(models) {
    user.belongsToMany(models.record, {
      through: 'collectionItems',
      foreignKey: 'recordId'
    })
  };
  return user;
}