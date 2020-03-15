const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;

const Username = sequelize.define('username', {
	username: {
		type: STRING,
		allowNull: false
	}
}, {
	timestamps: false
});

module.exports = Username;