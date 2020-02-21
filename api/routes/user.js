const express = require("express");
const router = express.Router();
const dbConnectionCreator = require("../db/db.js");

// Create a new user
router.post("/", (req, res) => {
    res.send(`create a new user: ${req.body.username}`);
});

// Get a user's profile data
router.get("/:id", (req, res) => {
    res.send(`get data for user: ${req.params.id}`);
});

// Update a user's profile data
router.patch("/:id", (req, res) => {
    res.send(`update data for user: ${req.params.id}`);
});

// Delete a user
router.delete("/:id", (req, res) => {
    res.send(`delete data for user: ${req.params.id}`);
});

module.exports = router;
