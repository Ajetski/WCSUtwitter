/*
* Project: WCSUtwitter
* File: /api/routes/block.js
* Author: Caleb Garrick
* 
* Documentation used: [sequelize api] https://sequelize.org/v5/identifiers
*/

// Modules
const { Block, UserName } = require('../db/models.js');
const auth = require('../middleware/auth');

const express = require('express');
const sequelize = require('../db/sequelize');
const router = express.Router();

// Block a user
router.post('/', auth, async (req, res) => {

	if(!req.body.blockedUser){
		return res.status(400).send({error: 'No blockedUsername provided'});
	}

	const transaction = await sequelize.transaction();
	try{

		const blockedUsername = await UserName.findOne({
			where: { username: req.body.blockedUser}
		});

		if(!blockedUsername){
			return res.status(404).send(`User ${blockedUsername} not found`);
		}

		const blockedID = blockedUsername.get('userid');

		await Block.create({
			blocker: req.body.id,
			blockeduser: blockedID
		});

		transaction.commit();

		return res.status(201).send({
			response: `The user '${req.body.blockedUser}' is now blocked.`
		});

	}
	catch(error){
		await transaction.rollback();
		return res.status(500).send({
			response: `Failed to block '${req.body.blockedUser}'.`,
			error: error.message
		});
	}
});

// Unblock a user
router.delete('/', auth, async (req, res) => {
	if(!req.body.unblockUser){
		return res.status(400).send({error: 'No unblockUsername provided'});
	}

	const transaction = await sequelize.transaction();

	try{

		const unblockUsername = await UserName.findOne({
			where: { username: req.body.unblockUser}
		});

		if(!unblockUsername){
			return res.status(404).send(`User ${req.body.unblockUser} not found`);
		}

		const unblockedID = unblockUsername.get('userid');
        
		await Block.destroy({
			where: { 
				blockeduser: unblockedID,
				blocker: req.body.id }
		});
        
		transaction.commit();
        
		return res.status(200).send({
			response: 'Unblock succeeded.'
		});
	}
	catch(error){
		await transaction.rollback();
		return res.status(500).send({
			response: `Failed to unblock '${req.body.unblockUser}'.`,
			error: error.message
		});
	}
});

router.get('/', auth, async(req, res) => {
	const transaction = await sequelize.transaction();

	try{

		const blocks = await Block.findAll({
			attributes: ['blockeduser'],
			where: { blocker: req.body.id }
		});
        
		transaction.commit();
        
		return res.status(200).send({
			blocks,
			response: 'Getting blocked users.'
		});
	}
	catch(error){
		await transaction.rollback();
		return res.status(500).send({
			response: 'Unable to get blocked users.',
			error: error.message
		});
	}
});

module.exports = router;