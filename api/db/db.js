const dbConnectionCreator = require('./dbConnector.js')

//this will be replaced with obtaining values for a secret file or enviornment variable
const host = ('127.0.0.1').trim();
const port = ('32776').trim(); 
const database = ('testingdb').trim();
const username = ('superuser').trim();
const password = ('password').trim();

const db = dbConnectionCreator({
	username,
	password,
	host,
	port,
	database
});

process.on('exit', () => {
    db.$pool.end();
});

module.exports = db;