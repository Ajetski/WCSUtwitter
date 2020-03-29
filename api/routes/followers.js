/*
* Project: WCSUtwitter
* File: /api/routes/followers.js
* Author: Adam Jensiki
* 
* Documentation used: [sequelize api] https://sequelize.org/v5/identifiers
*/
//my modules
const { Follow } = require('../db/models.js');
const auth = require('../middleware/auth');


//npm modules
const express = require('express');
const router = express.Router();


// follow a user
router.get('/', auth, async (req, res) => {
	try{
		
		const followers = await Follow.findAll({
			followeduser: req.body.id
		});

		return res.send(followers);
	}
	catch(error) {
		return res.status(500).send({
			response: `Login attempt for user '${req.body.username}' has failed.`,
			error: error.message
		});
	}
});

module.exports = router;
