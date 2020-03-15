//my modules
const imageUpload = require('../util/image-upload');
const { User, UserName, UserEmail } = require('../db/models');
const sequelize = require('../db/sequelize');

//core modules
const path = require('path');
const fs = require('fs');

//npm modules
const sharp = require('sharp');
const express = require('express');
const router = express.Router();

// Get a user's profile data
router.get('/:username', async (req, res) => {
	try{
		const userId = await UserName.findOne({
			attributes: ['id'],
			where:{
				username: req.params.username
			}
		});
		const user = await User.findOne({
			attributes: {
				exclude: ['hashedpassword']
			},
			where:{
				username: userId.id
			}
		});
		if (!user)
			return res.status(404).send({error: `User ${req.params.username} not found.`});
		return res.send(user);
	}
	catch(error) {
		return res.status(500).send({ error: error.message });
	}
});

// Get a user's profile picture
router.get('/:username/pic', async (req, res) => {
	try{
		//find a user by their username
		const user = await User.findOne({
			attributes: ['profpic'],
			where:{
				username: req.params.username
			}
		});
		//if user is not found, return 404
		if (!user)
			return res.status(404).send({error: `User ${req.params.username} not found.`});
		//if the user has a profile picture, serve it
		else if (user.profpic)
			res.sendFile(
				path.resolve(__dirname, '..', 'uploaded_media', 'user_profile_pics_large', `${req.params.username}.png`)
			);
		//if the user does not have a profile pic, serve the default
		else
			res.sendFile(
				path.resolve(__dirname, '..', 'uploaded_media', 'default_profile_pic', 'default.png')
			);
	}
	catch(error){
		return res.status(500).send({ error: error.message });
	}
});

// Create a new user
router.post('/', imageUpload.single('profpic'), async (req, res) => {
	if (typeof req.body.user !== 'object'){
		req.body.user = JSON.parse(req.body.user);
	}

	//get name of uploaded file
	const image = req.file ? req.file.filename : undefined;
	
	//if an image has been uploaded, resize and save image
	if (image) {
		req.body.user.profpic = true;

		try{
			await fs.unlink(path.resolve('uploaded_media', 'user_profile_pics_large', req.body.user.username) + '.png', () => {});
			await fs.unlink(path.resolve('uploaded_media', 'user_profile_pics_medium', req.body.user.username) + '.png', () => {});
			await fs.unlink(path.resolve('uploaded_media', 'user_profile_pics_small', req.body.user.username) + '.png', () => {});
		} catch (err) {
			console.log('Error', err);
		}

		try {
			//resize and save large image
			await sharp(req.file.path)
				.resize({ width: 500, height: 500 })
				.png()
				.toFile(
					path.resolve(req.file.destination, 'user_profile_pics_large', image)
				);

			//resize and save medium image
			await sharp(req.file.path)
				.resize({ width: 250, height: 250 })
				.png()
				.toFile(
					path.resolve(req.file.destination, 'user_profile_pics_medium', image)
				);
			
			//resize and save small image
			await sharp(req.file.path)
				.resize({ width: 50, height: 50 })
				.png()
				.toFile(
					path.resolve(req.file.destination, 'user_profile_pics_small', image)
				);

			fs.unlink(req.file.path, () => { });
		} catch (error) {
			//if image resizeing and saving fails, handle error
			console.log('Error:', error);
			return res.status(500).send({
				error,
				response: `User ${req.body.user.username} could not be created.`
			});
		}
	}
	//if there is no profpic, then the DB will save a false value
	else
		req.body.user.profpic = false;
	
	// create a transaction to be commited or rolled back later
	const transaction = await sequelize.transaction();

	try{
		//destructure the variables needed from req.body.user
		const {username, firstname, lastname, email, hashedpassword, profpic} = req.body.user;

		//create an instance in the user table
		const user = await User.create({
			firstname,
			lastname,
			hashedpassword,
			profpic,
		});

		//save the user's id from the new instance in users table
		const userId = user.dataValues.id;

		//create an instance in the username table w fk to users
		await UserName.create({
			id: userId,
			username
		});

		//create an instance in the useremail table w fk to users
		await UserEmail.create({
			id: userId,
			email
		});

		await transaction.commit();

		return res.send({
			response: `User ${req.body.user.username} has been created.`,
			profpic: req.body.user.profpic
		});

	}
	catch (error) {
		await transaction.rollback();

		return res.status(500).send({
			error: error,
			response: `User ${req.body.user.username} could not be created.`
		});
	}
});

// Update a user's profile data
router.patch('/:username', imageUpload.single('profpic'), async (req, res) => {
	if (typeof req.body.user !== 'object'){
		req.body.user = JSON.parse(req.body.user);
	}

	//get name of uploaded file
	const image = req.file ? req.file.filename : undefined;
	
	//if an image has been uploaded, resize and save image
	if (image) {
		req.body.user.profpic = true;
		try{
			await fs.unlink(path.resolve('uploaded_media', 'user_profile_pics_large', req.params.username) + '.png', () => {});
			await fs.unlink(path.resolve('uploaded_media', 'user_profile_pics_medium', req.params.username) + '.png', () => {});
			await fs.unlink(path.resolve('uploaded_media', 'user_profile_pics_small', req.params.username) + '.png', () => {});
		} catch (err) {
			console.log('Error', err);
		}

		try {
			//resize and save large image
			await sharp(req.file.path)
				.resize({ width: 500, height: 500 })
				.png()
				.toFile(
					path.resolve(req.file.destination, 'user_profile_pics_large', image)
				);

			//resize and save medium image
			await sharp(req.file.path)
				.resize({ width: 250, height: 250 })
				.png()
				.toFile(
					path.resolve(req.file.destination, 'user_profile_pics_medium', image)
				);
			
			//resize and save small image
			await sharp(req.file.path)
				.resize({ width: 50, height: 50 })
				.png()
				.toFile(
					path.resolve(req.file.destination, 'user_profile_pics_small', image)
				);

			await fs.unlink(req.file.path, () => {});
		} catch (error) {
			//if image resizeing and saving fails, handle error
			return res.status(500).send({
				error: error
			});
		}
	}
	else
		req.body.user.profpic = false;

	try{
		//query DB to apply changes to user
		await User.update(req.body.user, {
			where: {
				username: req.params.username
			}
		});
		return res.send({response: `User ${req.params.username} has been updated.`});
	}
	catch (error) {
		return res.status(500).send({
			error,
			response: `User ${req.params.username} could not be updated.`
		});
	}
	
});

// Delete a user
router.delete('/:username', async (req, res) => {
	await fs.unlink(path.resolve('uploaded_media', 'user_profile_pics_large', req.params.username) + '.png', () => {});
	await fs.unlink(path.resolve('uploaded_media', 'user_profile_pics_medium', req.params.username) + '.png', () => {});
	await fs.unlink(path.resolve('uploaded_media', 'user_profile_pics_small', req.params.username) + '.png', () => {});

	try{
		const userId = await UserName.findOne({
			where: {
				username: req.params.username
			}
		}).get('id');
		await UserEmail.destroy({
			where: {
				id: userId
			}
		});
		await UserName.destroy({
			where: {
				id: userId
			}
		});
		await User.destroy({
			where: {
				id: userId
			}
		});
		return res.send({response: `User ${req.params.username} has been deleted.`});
	}
	catch (error) {
		return res.status(500).send({
			error,
			response: `User ${req.params.username} could not be updated.`
		});
	}
});

module.exports = router;
