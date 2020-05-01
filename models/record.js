'use strict'
module.exports = (sequelize, DataTypes) => {
	const record = sequelize.define(
		'record',
		{
			artist: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			genre: {
				type: DataTypes.STRING,
			},
			style: {
				type: DataTypes.STRING,
			},
			format: {
				type: DataTypes.STRING,
			},
			year: {
				type: DataTypes.INTEGER,
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
			},
		},
		{}
	)
	record.associate = function (models) {
		record.belongsToMany(models.user, {
			through: 'collectionItems',
			foreignKey: 'userId',
		})
	}
	return record
}
