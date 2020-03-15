const sequelize = require('../sequelize.js')
const { DataTypes } = require('sequelize');

const UserEmail = sequelize.define('useremail', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = UserEmail;