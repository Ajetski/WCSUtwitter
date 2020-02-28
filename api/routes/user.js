//my modules
const imageUpload = require("../config/image-upload-config");
const {User} = require("../db/models")

//core modules
const path = require("path");
const fs = require("fs");

//npm modules
const sharp = require("sharp");
const express = require("express");
const router = express.Router();

// Get a user's profile data
router.get("/:username", async (req, res) => {
	try{
		const user = await User.findOne({
			attributes: {
				exclude: ['hashedpassword']
			},
			where:{
				username: req.params.username
			}
		});
		if (!user)
			return res.status(404).send({error: `User ${req.params.username} not found.`})
		return res.send(user);
	}
	catch(error) {
		return res.status(500).send({ error: error.message });
	}
});

// Get a user's profile picture
router.get("/:username/pic", async (req, res) => {
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
			return res.status(404).send({error: `User ${req.params.username} not found.`})
		//if the user has a profile picture, serve it
		else if (user.profpic)
			res.sendFile(
				path.resolve(__dirname, "..", "uploaded_media", "user_profile_pics_large", `${req.params.username}.png`)
			);
		//if the user does not have a profile pic, serve the default
		else
			res.sendFile(
				path.resolve(__dirname, "..", "uploaded_media", "default_profile_pic", "default.png")
			);
	}
	catch(error){
		return res.status(500).send({ error: error.message });
	}
});

// Create a new user
router.post("/", imageUpload.single("profpic"), async (req, res) => {

	req.body.user = JSON.parse(req.body.user)

	//get name of uploaded file
	const image = req.file ? req.file.filename : undefined;
	console.log(req.file)
	
	//if an image has been uploaded, resize and save image
	if (image) {
		req.body.user.profpic = true;

		try{
			await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_large", req.params.username) + '.png', err => {});
			await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_medium", req.params.username) + '.png', err => {});
			await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_small", req.params.username) + '.png', err => {});
		} catch (err) {}

		try {
			//resize and save large image
			await sharp(req.file.path)
				.resize({ width: 500, height: 500 })
				.png()
				.toFile(
					path.resolve(req.file.destination, "user_profile_pics_large", image)
				);

			//resize and save medium image
			await sharp(req.file.path)
				.resize({ width: 250, height: 250 })
				.png()
				.toFile(
					path.resolve(req.file.destination, "user_profile_pics_medium", image)
				);
			
			//resize and save small image
			await sharp(req.file.path)
				.resize({ width: 50, height: 50 })
				.png()
				.toFile(
					path.resolve(req.file.destination, "user_profile_pics_small", image)
				);

			await fs.unlink(req.file.path, err => {
			});
		} catch (error) {
			//if image resizeing and saving fails, handle error
			console.log("Error:", error);
			return res.status(500).send({
				error: error
			});
		}
	}
	else
		req.body.user.profpic = false;

	try{
		await User.create(req.body.user);
		res.send({
			response: `User ${req.body.user.username} has been created.`,
			profpic: req.body.user.profpic
		})
	}
	catch (error) {
		res.status(500).send({
			error: error,
			response: `User ${req.body.user.username} could not be created.`
		})
	}
});

// Update a user's profile data
router.patch("/:username", imageUpload.single("profpic"), async (req, res) => {

	console.log(req.body.user)
	req.body.user = JSON.parse(req.body.user)

	//get name of uploaded file
	const image = req.file ? req.file.filename : undefined;
	
	//if an image has been uploaded, resize and save image
	if (image) {
		req.body.user.profpic = true;
		try{
			await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_large", req.params.username) + '.png', err => {});
			await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_medium", req.params.username) + '.png', err => {});
			await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_small", req.params.username) + '.png', err => {});
		} catch (err) {}

		try {
			//resize and save large image
			await sharp(req.file.path)
				.resize({ width: 500, height: 500 })
				.png()
				.toFile(
					path.resolve(req.file.destination, "user_profile_pics_large", image)
				);

			//resize and save medium image
			await sharp(req.file.path)
				.resize({ width: 250, height: 250 })
				.png()
				.toFile(
					path.resolve(req.file.destination, "user_profile_pics_medium", image)
				);
			
			//resize and save small image
			await sharp(req.file.path)
				.resize({ width: 50, height: 50 })
				.png()
				.toFile(
					path.resolve(req.file.destination, "user_profile_pics_small", image)
				);

			await fs.unlink(req.file.path, err => {
			});
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
		return res.send({response: `User ${req.params.username} has been updated.`})
	}
	catch (error) {
		return res.status(500).send({
			error,
			response: `User ${req.params.username} could not be updated.`
		})
	}
	
});

// Delete a user
router.delete("/:username", async (req, res) => {
	await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_large", req.params.username) + '.png', err => {});
	await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_medium", req.params.username) + '.png', err => {});
	await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_small", req.params.username) + '.png', err => {});

	try{
		await User.destroy({
			where: {
				username: req.params.username
			}
		})
		return res.send({response: `User ${req.params.username} has been deleted.`});
	}
	catch (error) {
		return res.status(500).send({
			error,
			response: `User ${req.params.username} could not be updated.`
		})
	}
});

module.exports = router;
