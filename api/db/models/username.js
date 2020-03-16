const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;

const Username = sequelize.define('username', {
	userid: {
		primaryKey: true,
		type: INTEGER,
		allowNull: false
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