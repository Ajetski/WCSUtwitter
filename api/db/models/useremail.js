const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;

const UserEmail = sequelize.define('useremail', {
	id: {
		primaryKey: true,
		type: INTEGER,
		autoIncrement: true
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