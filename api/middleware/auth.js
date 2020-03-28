const jwt = require('jsonwebtoken');
const { LoginSession, TrustedDevice, UserName } = require('../db/models');

const auth = async (req, res, next) => {
	try{
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const session = await LoginSession.findOne({
			where: {
				userid: decoded.id,
				sessionid: token
			}
		});

		const device = await TrustedDevice.findOne({
			where:{
				userid: decoded.id,
				authtoken: token
			}
		});

		if(!session && !device){
			throw new Error();
		}

		const username = await UserName.findOne({
			attributes: ['username'],
			where: {
				userid: decoded.id
			}
		}).get('username');

		req.body.id = decoded.id;
		req.body.username = username;
		req.body.jwt = token;

		next();
	}
	catch (error){
		res.status(401).send({
			error: 'Please authenticate.'
		});
	}

};

module.exports = auth;