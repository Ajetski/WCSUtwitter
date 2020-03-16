const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const INTEGER = DataTypes.INTEGER;

const Block = sequelize.define('block', {
	blocker: {
		primaryKey: true,
		type: INTEGER,
		autoIncrement: true,
		allowNull: false
	},
	blockeduser: {
		primaryKey: true,
		type: INTEGER,
		autoIncrement: true,
		allowNull: false
	}
}, {
	timestamps: false,
	tableName: 'block'
});

module.exports = Block;