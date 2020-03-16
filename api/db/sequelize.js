const { Sequelize } = require('sequelize');
require('dotenv').config();

// For the following line to work, you must either have a .env file with the following format:
// DB_CONNECTION_STRING=postgres://example
// see .env.example file in the parent directory of this file
const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STRING}`);

// log if connection is established
sequelize.authenticate().then(() => console.log('DB connected')).catch(err => console.log('DB error:', err));

module.exports = sequelize;