const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;

const Username = sequelize.define('username', {
	id: {
		primaryKey: true,
		type: INTEGER,
		autoIncrement: true
	},
	username: {
		primaryKey: true,
		type: STRING,
		allowNull: false
	}
}, {
	timestamps: false,
	tableName: 'username'
});

module.exports = Username;