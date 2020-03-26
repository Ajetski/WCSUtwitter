/*
* Project: WCSUtwitter
* File: /api/routes/login.js
* Author: Adam Jensiki
* 
* Documentation used: [sequelize api] https://sequelize.org/v5/identifiers
*/
//my modules
const {User, UserName, LoginSession} = require('../db/models.js');


//npm modules
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const sequelize = require('../db/sequelize');
const router = express.Router();

//todo:
/*
1) accept a post request w a useranme and plain text password
2) look in the DB for a user w that username
3) see if the user's hashed password is a hashed version of the password they provide us
4) if so, log them in via adding a session to the DB
-	to do this, we need to create a session id (auth token, JWT)
5) then serve back the JWT in the response to the user
*/

// Get a user's profile data
router.post('/', async (req, res) => {
	//req.body.username
	//req.body.password

	const transaction = await sequelize.transaction();

	try{
		const username = await UserName.findOne({
			where: {
				username: req.body.username
			}
		});
		if (!username)
			return res.status(404).send({error: `User ${req.params.username} not found.`});
			
		const userId = username.get('userid');

		const userHashedPassword = await User.findOne({
			attributes: ['hashedpassword'],
			where: {
				id: userId
			}
		}).get('hashedpassword');

		const passIsCorrect = await bcrypt.compare(req.body.password, userHashedPassword);
		if(!passIsCorrect){
			res.status(400).send({
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
