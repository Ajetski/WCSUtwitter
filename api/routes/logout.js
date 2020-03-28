/*
* Project: WCSUtwitter
* File: /api/routes/logout.js
* Author: Adam Jensiki
* 
* Documentation used: [sequelize api] https://sequelize.org/v5/identifiers
*/
//my modules
const { TrustedDevice, LoginSession } = require('../db/models.js');
const auth = require('../middleware/auth');


//npm modules
const express = require('express');
const sequelize = require('../db/sequelize');
const router = express.Router();

// Get a user's profile data
router.delete('/', auth, async (req, res) => {

	const transaction = await sequelize.transaction();

	try{
		await LoginSession.destroy({
			where: {
				userid: req.body.id,
				sessionid: req.body.jwt
			}
		});

		await TrustedDevice.destroy({
			where: {
				userid: req.body.id,
				authtoken: req.body.jwt
			}
		});

		transaction.commit();
		return res.send({
			response: 'Logout successful.'
		});
	}
	catch(error) {
		await transaction.rollback();
		return res.status(500).send({
			response: `Login attempt for user '${req.body.username}' has failed.`,
			error: error.message
		});
	}
});

module.exports = router;
