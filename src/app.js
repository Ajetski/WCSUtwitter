const path = require('path')
const express = require('express')
const hbs = require('express-handlebars')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsDirectoryPath = path.join(__dirname, './views')

//define port to listen on
const PORT = process.env.PORT || 8080

// Setup handlebars engine
app.engine('.hbs', hbs({extname: '.hbs'}));
app.set('view engine', 'handlebars');

// Setup directories to files
app.use(express.static(publicDirectoryPath))
app.set('views', viewsDirectoryPath)

app.get('', (req, res) => {
    return res.send('hello world')
})

app.listen(PORT, () => {
    console.log('Server is listening on port ' + String(PORT) + '...')
})
