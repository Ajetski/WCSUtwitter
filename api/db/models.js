const path = require('path');
const { readdirSync } = require('fs');

const modules_parent_dir = path.join(__dirname, 'models');
const modules_folders = readdirSync(modules_parent_dir);

let modules = {};

modules_folders.forEach(fileName => {
	fileName = fileName.substr(0, fileName.length - 3);
	modules[fileName] = require(`./models/${fileName}`);
});


module.exports = modules;