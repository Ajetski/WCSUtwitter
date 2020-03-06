const sequelize = require('../sequelize.js')
const { DataTypes } = require('sequelize');

const UserEmail = sequelize.define('useremail', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = UserEmail;