//my modules
const {User} = require("../db/models.js");

//npm modules
const express = require("express");
const router = express.Router();


// Get a user's profile data
router.post("/", async (req, res) => {
	try{
		const user = await User.findOne({
			where: {
				username: req.body.username,
				hashedpassword: req.body.hashedpassword
			}
		});
		if (!user)
				return res.status(404).send({error: `User ${req.params.username} not found.`});
			return res.send({
				response: `Login attempt for user '${req.body.username}' was a success.`,
				jwt: "1234567890" //fake jwt, need to implement real jwt
			});
	}
	catch(error) {
		return res.status(500).send({
			response: `Login attempt for user '${req.body.username}' has failed.`,
			error: error.message
		});
	}
});

module.exports = router;
