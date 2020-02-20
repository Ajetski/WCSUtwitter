const express = require('express');
const router = express.Router();
const dbConnectionCreator = require('../db/db.js');

// Default route
router.get('/api/test', (req, res) => {
  res.send('hello world')
});

module.exports = router;