const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;

const UserEmail = sequelize.define('useremail', {
	email: {
		type: STRING,
		allowNull: false
	}
}, {
	timestamps: false
});

module.exports = UserEmail;