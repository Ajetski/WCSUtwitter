const sequelize = require('../sequelize.js')
const {Model, DataTypes } = require('sequelize');

const Users = sequelize.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hashedpassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profpic: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    privacysetting: {
        type: DataTypes.JSON,
        allowNull: true
    },
    notificationsetting: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    timestamps: false
})

module.exports = Users;