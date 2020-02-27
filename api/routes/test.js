const express = require("express");
const router = express.Router();
const {User} = require("../db/models");

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
	User.findOne().then(results => {
		res.send(results)
	}).catch(error => {
		res.status(500).send(error)
	})
});

module.exports = router;
