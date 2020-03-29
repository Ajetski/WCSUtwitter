/*
* Project: WCSUtwitter
* File: /api/routes/login.js
* Author: Adam Jensiki
* 
* Documentation used: [sequelize api] https://sequelize.org/v5/identifiers
*/
//my modules
const {User, UserName, LoginSession} = require('../db/models.js');
const { aesDecrypt } = require('../util/encryption');


//npm modules
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const sequelize = require('../db/sequelize');
const router = express.Router();

// Get a user's profile data
router.post('/', async (req, res) => {

	const transaction = await sequelize.transaction();

	try{

		if(!req.body.username) {
			return res.status(404).send({
				error: 'No username provided.'
			});
		}

		if(!req.body.password) {
			return res.status(404).send({
				error: 'No password provided.'
			});
		}

		req.body.password = aesDecrypt(req.body.password, req.body.username);

		const username = await UserName.findOne({
			where: {
				username: req.body.username
			}
		});
		if (!username)
			return res.status(404).send({error: `User '${req.body.username}' not found.`});
			
		const userId = username.get('userid');

		const userHashedPassword = await User.findOne({
			attributes: ['hashedpassword'],
			where: {
				id: userId
			}
		}).get('hashedpassword');

		const passIsCorrect = await bcrypt.compare(req.body.password, userHashedPassword);
		if(!passIsCorrect){
			return res.status(400).send({
				error: 'Incorrect username or password.'
			});
		}

		const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
			expiresIn: '2 days'
		});

		await LoginSession.create({
			userid: userId,
			sessionid: token
		});

		transaction.commit();

		return res.status(201).send({
			jwt: token,
			response: `The user '${req.body.username}' is now logged in.`
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
