const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;
const TIMESTAMP = DataTypes.DATE;

const Reply = sequelize.define('reply', {
	id: {
		primaryKey: true,
		type: INTEGER,
		autoIncrement: true,
		allowNull: false
	},
	userid: {
		type: INTEGER,
		allowNull: false
	},
	parentpostid: {
		type: INTEGER,
		allowNull: false
	},
	parentreplyid: {
		type: INTEGER
	},
	textcontent: {
		type: STRING,
		allowNull: false
	},
	replytime: {
		type: TIMESTAMP,
		allowNull: false
	}
}, {
	timestamps: false,
	tableName: 'reply'
});

module.exports = Reply;