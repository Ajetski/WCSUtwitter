const multer = require("multer");
const path = require("path")
const fs = require("fs")

module.exports = multer({
	storage: multer.diskStorage({
		destination: async function(req, file, cb) {
			if (typeof req.body.user !== "object"){
				req.body.user = JSON.parse(req.body.user)
			}
			//delete previous files
			username = req.body.user.username || req.params.username
			previous_path_base = path.resolve("uploaded_media", "user_profile_pics", username)
			await fs.unlink(previous_path_base + '.png', err => {});
			await fs.unlink(previous_path_base + '_small.png', err => {});

			path.resolve("uploaded_media", username)


			cb(null, "uploaded_media");
		},
		filename: function(req, file, cb) {
			if (typeof req.body.user !== "object"){
				req.body.user = JSON.parse(req.body.user)
			}
			cb(null, req.body.user.username || req.params.username + ".png"); //Appending .png
		}
	}),
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb) {
		console.log()
		if (!file.originalname.match(/\.(png|jpg|jpeg)$/i) && file) {
			return cb(
				new Error("Please upload an image of type png, jpg, jpeg.")
			);
		}
		cb(null, true);
	}
});