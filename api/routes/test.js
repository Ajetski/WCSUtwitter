const express = require("express");
const router = express.Router();
const dbConnectionCreator = require("../db/db.js");

const host = ('127.0.0.1').trim();
const port = ('32776').trim(); 
const database = ('testingdb').trim();
const username = ('api').trim();
const password = ('mypass').trim();

const db = dbConnectionCreator({
	username,
	password,
	host,
	port,
	database
});

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

process.on('exit', () => {
    db.$pool.end();
});

module.exports = router;
