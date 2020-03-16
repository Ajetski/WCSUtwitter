const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STRING}`);

// log if connection is established
sequelize.authenticate().then(() => console.log('DB connected')).catch(err => console.log('DB error:', err));

module.exports = sequelize;