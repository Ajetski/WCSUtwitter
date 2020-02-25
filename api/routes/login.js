//my modules
const db = require("../db/db.js");

//npm modules
const express = require("express");
const router = express.Router();


// Get a user's profile data
router.post("/", (req, res) => {
    db.one(
		`SELECT username, firstname, lastname, email
		FROM users
		WHERE username = '${req.body.username}' AND hashedpassword = '${req.body.hashedpassword}';`
	).then((p) => {
		return res.send({
			response: `Login attempt for user '${req.body.username}' was a success.`,
			jwt: "1234567890" //fake jwt, need to implement real jwt
		});
	}).catch((error) => {
		return res.status(404).send({
			response: `Login attempt for user '${req.body.username}' has failed.`,
			error: error.message
		});
	});
});

module.exports = router;
