const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;

const TrustedDevice = sequelize.define('trusteddevice', {
	userid: {
		primaryKey: true,
		type: INTEGER,
		allowNull: false
	},
	authtoken: {
		primaryKey: true,
		type: STRING,
		allowNull: false
	}
}, {
	timestamps: false,
	tableName: 'trusteddevice'
});

module.exports = TrustedDevice;