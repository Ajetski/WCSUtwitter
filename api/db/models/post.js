const sequelize = require('../sequelize');

const { DataTypes } = require('sequelize');

const STRING = DataTypes.STRING;
const INTEGER = DataTypes.INTEGER;
const LOCATION = DataTypes.LOCATION;
const BYTEA = DataTypes.BLOB;
const TIMESTAMP = DataTypes.DATE;

const Post = sequelize.define('post', {
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
		type: INTEGER
	},
	media: {
		type: BYTEA
	},
	textcontent: {
		type: STRING,
		allowNull: false
	},
	posttime: {
		type: TIMESTAMP,
		allowNull: false
	},
	postloc: {
		type: LOCATION
	}
}, {
	timestamps: false,
	tableName: 'post'
});

module.exports = Post;