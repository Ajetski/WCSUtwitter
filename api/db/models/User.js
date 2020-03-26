const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;
const BOOLEAN = DataTypes.BOOLEAN;
const JSON = DataTypes.JSON;

const Users = sequelize.define('user', {
	id: {
		primaryKey: true,
		type: INTEGER,
		autoIncrement: true,
		allowNull: false
	},
	firstname: {
		type: STRING,
		allowNull: false
	},
	lastname: {
		type: STRING,
		allowNull: false
	},
	hashedpassword: {
		type: STRING,
		allowNull: false
	},
	profpic: {
		type: BOOLEAN,
		allowNull: false
	},
	privacysetting: {
		type: JSON,
		allowNull: true
	},
	notificationsetting: {
		type: JSON,
		allowNull: true
	}
}, {
	timestamps: false,
	tableName: 'users'
});

module.exports = Users;