const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

// Default route
router.post("/", (req, res) => {
	console.log(req.body);
	res.send(`username is ${req.body.username}`);
});

router.get("/select", (req, res) => {
	db.any(
		`SELECT *
		FROM customer_t
		ORDER BY customername
		LIMIT 3;`
	).then((p) => {
		return res.send(p)
	}).catch((error) => {
		return res.send(error)
	});
});

module.exports = router;
