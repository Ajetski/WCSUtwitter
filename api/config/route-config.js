(function(routeConfig) {
	routeConfig.init = function(app) {
		// *** routes *** //
		const testRoutes = require("../routes/test.js");
		const userRoutes = require("../routes/user.js");
		const loginRoutes = require("../routes/login.js");

		// *** register routes *** //
		app.use("/api/test", testRoutes);
		app.use("/api/user", userRoutes);
		app.use("/api/login", loginRoutes);
	};
})(module.exports);
