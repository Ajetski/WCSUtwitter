const express = require('express');

const router = express.Router();

// Default route
router.get('/', (req, res) => {
  res.send('hello world')
});

module.exports = router;