(function(routeConfig) {
	routeConfig.init = function(app) {
		// *** routes *** //
		const testRoutes = require('../routes/test');
		const userRoutes = require('../routes/user');
		const usersRoutes = require('../routes/users');
		const loginRoutes = require('../routes/login');
		const logoutRoutes = require('../routes/logout');
		const followRoutes = require('../routes/follow');
		const followersRoutes = require('../routes/followers');
		const blockRoutes = require('../routes/block');

		// *** register routes *** //
		app.use('/api/test', testRoutes);
		app.use('/api/user', userRoutes);
		app.use('/api/users', usersRoutes);
		app.use('/api/login', loginRoutes);
		app.use('/api/logout', logoutRoutes);
		app.use('/api/follow', followRoutes);
		app.use('/api/followers', followersRoutes);
		app.use('/api/block', blockRoutes);
	};
})(module.exports);
