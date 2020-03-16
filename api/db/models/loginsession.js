const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;

const LoginSession = sequelize.define('loginsession', {
	userid: {
		primaryKey: true,
		type: INTEGER,
		autoIncrement: true,
		allowNull: false
	},
	sessionid: {
		primaryKey: true,
		type: STRING,
		allowNull: false
	}
}, {
	timestamps: false,
	tableName: 'loginsession'
});

module.exports = LoginSession;