const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

// Default route

const multer = require('multer')
const upload = multer({
	
})

router.post("/", upload.single('picture'), (req, res) => {
	console.log(req.file.buffer);
	console.log(req.file)
	res.send({
		body: req.body
	});
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
