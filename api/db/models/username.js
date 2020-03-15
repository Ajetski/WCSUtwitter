const sequelize = require('../sequelize.js')
const { DataTypes } = require('sequelize');

const Username = sequelize.define('username', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Username;