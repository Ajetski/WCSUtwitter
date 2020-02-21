const express = require("express");
const router = express.Router();
const dbConnectionCreator = require("../db/db.js");

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

// Create a new user
router.post("/", (req, res) => {
	/** request body will have the following fields:
	 * ID
	 * Username
	 * Firstname
	 * Lastname
	 * Email
	 * HashedPassword
	 * ProfilePic
	 * PrivacySetting
	 * NotificationSetting
	 */

	db.any(
		`INSERT INTO users (id, username, firstname, lastname, email, hashedpassword, profpic, privacysetting, notificationsetting) VALUES
		(
			DEFAULT, '${req.body.username}',
			'${req.body.firstname}',
			'${req.body.lastname}',
			'${req.body.email}',
			'${req.body.hashedpassword}',
			${req.body.profpic || "NULL"},
			${req.body.profpic ? `'${req.body.privacysetting}'` : "NULL"},
			${req.body.profpic ? `'${req.body.notificationsetting}'` : "NULL"}
		);`
	).then((p) => {
		return res.send(`User '${req.body.username}' has been created.`)
	}).catch((error) => {
		return res.status(500).send(error)
	});
});

// Get a user's profile data
router.get("/:username", (req, res) => {
	console.log(`'${req.params.username}'`)
    db.any(
		`SELECT username, firstname, lastname, email
		FROM users
		WHERE username = '${req.params.username}';`
	).then((p) => {
		return res.send(p);
	}).catch((error) => {
		return res.status(500).send(error);
	});
});

// Update a user's profile data
router.patch("/:username", (req, res) => {
	/** To be implemented
	console.log(`'${req.params.username}'`)
    db.any(
		`SELECT username, firstname, lastname, email
		FROM users
		WHERE username = '${req.params.username}';`
	).then((p) => {
		return res.send(p);
	}).catch((error) => {
		return res.status(500).send(error);
	});
	 */
	res.send('Not yet implemented.');
});

// Delete a user
router.delete("/:username", (req, res) => {
	console.log(`'${req.params.username}'`)
    db.any(
		`DELETE FROM users
		WHERE username = '${req.params.username}';`
	).then((p) => {
		return res.send(`User '${req.body.username}' has been deleted.`)
	}).catch((error) => {
		return res.status(500).send(error);
	});
});

process.on('exit', () => {
    db.$pool.end();
});

module.exports = router;
