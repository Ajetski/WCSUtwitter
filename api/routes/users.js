//my modules
const { UserName } = require('../db/models');
const auth = require('../middleware/auth');

//npm modules
const { Op } = require('sequelize');
const express = require('express');
const router = express.Router();

router.get('/:username/:page', auth,  async (req, res) => {
	const page_size = 10;
	try{
		const usernames = await UserName.findAll({
			attributes: ['username'],
			where: {
				username: {
					[Op.like]: `%${req.params.username}%`
				}
			},
			limit: page_size,
			offset: (req.params.page * page_size)
		});

		return res.send({
			users: usernames
		});
	}
	catch(error) {
		console.log(error);
		return res.status(500).send({
			error
		});
	}
});

module.exports = router;