const { aesEncrypt } = require('../util/encryption');

const username = process.argv[2];
const password = process.argv[3];

console.log(username, password);

console.log(aesEncrypt(password, username));