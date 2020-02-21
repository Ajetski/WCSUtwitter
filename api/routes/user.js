const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

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
		`INSERT INTO users (
			id, username, firstname, lastname, email,
			hashedpassword, profpic, privacysetting, notificationsetting
		) VALUES
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
		return res.status(200).send({
			response: `User '${req.body.username}' has been created.`
		});
	}).catch((error) => {
		return res.status(500).send({
			error: `User '${req.body.username}' could not be created.`,
			postgres_response: error
		});
	});
});

// Get a user's profile data
router.get("/:username", (req, res) => {
    db.any(
		`SELECT username, firstname, lastname, email
		FROM users
		WHERE username = '${req.params.username}';`
	).then((p) => {
		if (p.length < 1) {
			throw new Error(`User '${req.params.username}' could not be found.`);
		}
		return res.send(p);
	}).catch((error) => {
		return res.status(404).send({"error": `${error}`});
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
    db.any(
		`DELETE FROM users
		WHERE username = '${req.params.username}';`
	).then((p) => {
		return res.send({
			response: `User '${req.params.username}' has been deleted.`
		})
	}).catch((error) => {
		return res.status(500).send({
			error: `User '${req.params.username}' could not be created.`,
			postgres_response: error
		});
	});
});

module.exports = router;
