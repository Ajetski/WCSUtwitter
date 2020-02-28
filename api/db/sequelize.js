const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://superuser:password@127.0.0.1:32776/testingdb')

// log if connection is established
sequelize.authenticate().then(() => console.log('DB connected')).catch(err => console.log('DB error:', err))

module.exports = sequelize;