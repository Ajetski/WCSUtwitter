const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const INTEGER = DataTypes.INTEGER;

const Follow = sequelize.define('follow', {
	follower: {
		primaryKey: true,
		type: INTEGER,
		allowNull: false
	},
	followeduser: {
		primaryKey: true,
		type: INTEGER,
		allowNull: false
	}
}, {
	timestamps: false,
	tableName: 'follow'
});

module.exports = Follow;