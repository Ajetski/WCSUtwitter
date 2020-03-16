const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;

const UserEmail = sequelize.define('useremail', {
	userid: {
		primaryKey: true,
		type: INTEGER,
		autoIncrement: true,
		allowNull: false
	},
	email: {
		primaryKey: true,
		type: STRING,
		allowNull: false
	}
}, {
	timestamps: false,
	tableName: 'useremail'
});

module.exports = UserEmail;