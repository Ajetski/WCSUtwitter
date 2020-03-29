/*
* Project: WCSUtwitter
* File: /api/routes/follow.js
* Author: Adam Jensiki
* 
* Documentation used: [sequelize api] https://sequelize.org/v5/identifiers
*/
//my modules
const { Follow, UserName } = require('../db/models.js');
const auth = require('../middleware/auth');


//npm modules
const express = require('express');
const sequelize = require('../db/sequelize');
const router = express.Router();


// following users
router.get('/', auth, async (req, res) => {
	try{
		
		const following = await Follow.findAll({
			follower: req.body.id
		});

		return res.send(following);
	}
	catch(error) {
		return res.status(500).send({
			response: `Login attempt for user '${req.body.username}' has failed.`,
			error: error.message
		});
	}
});

// follow a user
router.post('/', auth, async (req, res) => {
	if(!req.body.followUser){
		return res.status(400).send({
			error: 'followedUser not provided.'
		});
	}

	const transaction = await sequelize.transaction();

	try{
		const follow_username = await UserName.findOne({
			attributes: ['userid'],
			where: {
				username: req.body.followUser
			}
		});

		if (!follow_username) {
			res.status(404).send({
				error: 'User not found.'
			});
		}

		const follow_id = follow_username.get('userid');
		
		await Follow.create({
			follower: req.body.id,
			followeduser: follow_id
		});

		transaction.commit();
		return res.send({
			response: 'Follow successful.'
		});
	}
	catch(error) {
		await transaction.rollback();
		return res.status(500).send({
			response: 'Follow attempt has failed.',
			error: error.message
		});
	}
});

// unfollow a user
router.delete('/', auth, async (req, res) => {
	if(!req.body.followUser){
		return res.status(400).send({
			error: 'followedUser not provided.'
		});
	}

	const transaction = await sequelize.transaction();

	try{
		const follow_username = await UserName.findOne({
			attributes: ['userid'],
			where: {
				username: req.body.followUser
			}
		});

		if (!follow_username) {
			res.status(404).send({
				error: 'User not found.'
			});
		}

		const follow_id = follow_username.get('userid');
		
		await Follow.destroy({
			where: {
				follower: req.body.id,
				followeduser: follow_id
			}
		});

		transaction.commit();
		return res.send({
			response: 'Unfollow successful.'
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
