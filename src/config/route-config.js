(function (routeConfig) {
    routeConfig.init = function (app) {
      // *** routes *** //
      const baseRoutes = require('../routes/base.js');
  
      // *** register routes *** //
      app.use('/', baseRoutes);
  
    };
  }(module.exports));