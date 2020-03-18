(function(appConfig) {
	appConfig.init = function(app, express) {
		//Add express setings here
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
	};
})(module.exports);
