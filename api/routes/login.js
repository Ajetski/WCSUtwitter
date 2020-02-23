const express = require("express");
const router = express.Router();
const db = require("../db/db.js");


// Get a user's profile data
router.post("/login", (req, res) => {
    db.any(
		`SELECT username, firstname, lastname, email
		FROM users
		WHERE username = '${req.params.username}';`
	).then((p) => {
		if (p.length < 1) {
			throw new Error(`User '${req.params.username}' could not be found.`);
		}
		return res.send(p[0]);
	}).catch((error) => {
		return res.status(404).send({"error": `${error.message}`});
	});
});

module.exports = router;
