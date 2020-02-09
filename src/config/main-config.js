(function (appConfig) {
    // *** main dependencies *** //
    const path = require('path')
    const hbs = require('express-handlebars')
  
    appConfig.init = function (app, express) {
        // Define paths for Express config
        const publicDirectoryPath = path.join(__dirname, '../client/public')
        const viewsDirectoryPath = path.join(__dirname, '../client/views')

        // Setup handlebars engine
        app.engine('.hbs', hbs({extname: '.hbs'}))
        app.set('view engine', 'handlebars')

        // Setup directories to files
        app.use(express.static(publicDirectoryPath))
        app.set('views', viewsDirectoryPath)
    };
  }(module.exports));