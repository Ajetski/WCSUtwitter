//my modules
const imageUpload = require("../config/image-upload-config");
const db = require("../db/db.js");

//core modules
const path = require("path");
const fs = require("fs");

//npm modules
const sharp = require("sharp");
const express = require("express");
const router = express.Router();

// Get a user's profile data
router.get("/:username", (req, res) => {
	db.one(
		`SELECT username, firstname, lastname, email, profpic
		FROM users
		WHERE username = '${req.params.username}';`
	)
		.then(p => {
			return res.send(p);
		})
		.catch(error => {
			return res.status(404).send({ error: `${error.message}` });
		});
});

// Get a user's profile picture
router.get("/:username/pic", (req, res) => {
	db.one(
		`SELECT profpic
		FROM users
		WHERE username = '${req.params.username}';`
	)
		.then(query_result => {
			if (query_result.profpic) {
				res.sendFile(
					path.resolve(__dirname, "..", "uploaded_media", "user_profile_pics_large", `${req.params.username}.png`)
				);
			} else {
				res.sendFile(
					path.resolve(__dirname, "..", "uploaded_media", "default_profile_pic", "default.png")
				);
			}
		})
		.catch(error => {
			return res.status(404).send({ error: `${error.message}` });
		});
});

// Create a new user
router.post("/", imageUpload.single("profpic"), async (req, res) => {

	//get name of uploaded file
	const image = req.file ? req.file.filename : undefined;
	
	//if an image has been uploaded, resize and save image
	if (image) {

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

	// query database to insert user
	db.none(
		`INSERT INTO users (
			id, username, firstname, lastname, email,
			hashedpassword, profpic, privacysetting, notificationsetting
		) VALUES
		(
			DEFAULT, '${req.body.username}',
			'${req.body.firstname}',
			'${req.body.lastname}',
			'${req.body.email}',
			'${req.body.hashedpassword}',
			${req.file ? "true" : "false"},
			${req.body.privacysetting ? `'${req.body.privacysetting}'` : "NULL"},
			${req.body.notificationsetting ? `'${req.body.notificationsetting}'` : "NULL"}
		);`
	).then(p => {
		//on success of query
		return res.status(200).send({
			response: `User '${req.body.username}' has been created.`,
			picture_uploaded: req.file ? true : false
		});
	}).catch(error => {
		//on failure of query
		return res.status(500).send({
			response: `User '${req.body.username}' could not be created.`,
			error: error
		});
	});
});

// Update a user's profile data
router.patch("/:username", imageUpload.single("profpic"), async (req, res) => {

	//get name of uploaded file
	const image = req.file ? req.file.filename : undefined;
	
	//if an image has been uploaded, resize and save image
	if (image) {

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

	//get all of the updates to user into a string
	updateString = "";
	if(image) updateString = ', profpic = true'
	for (const field in req.body) {
		updateString = `${updateString},\n${field} = '${req.body[field]}'`;
	}
	//get rid of leading comma
	updateString = updateString.substr(2);

	console.log(`update string: '${updateString}'`)

	//query DB to apply changes to user
	db.none(
		`UPDATE users
		SET ${updateString}
		WHERE username = '${req.params.username}';`
	)
		.then(p => {
			//on success of query
			return res.status(200).send({
				response: `User '${req.body.username}' has been updated.`
			});
		})
		.catch(error => {
			//on failure of query
			return res.status(500).send({
				response: `Could not update user ${req.params.username}.`,
				error: error
			});
		});
});

// Delete a user
router.delete("/:username", async (req, res) => {
	await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_large", req.params.username) + '.png', err => {});
	await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_medium", req.params.username) + '.png', err => {});
	await fs.unlink(path.resolve("uploaded_media", "user_profile_pics_small", req.params.username) + '.png', err => {});

	db.any(
		`DELETE FROM users
		WHERE username = '${req.params.username}';`
	)
		.then(p => {
			return res.send({
				response: `User '${req.params.username}' has been deleted.`
			});
		})
		.catch(error => {
			return res.status(500).send({
				response: `User '${req.params.username}' could not be deleted.`,
				error: error
			});
		});
});

module.exports = router;
