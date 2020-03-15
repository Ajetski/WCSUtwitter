const sequalize = require('./sequelize');
const User = require('./models/users');
const UserName = require('./models/username');
const UserEmail = require('./models/useremail');

UserName.belongsTo(User);
UserEmail.belongsTo(User);

module.exports = {
    User,
	UserName,
	UserEmail
};