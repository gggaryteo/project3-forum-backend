const express = require("express");
const router = express.Router();
const { signUp, signIn, getOne } = require("../controllers/usersController");

// Register
router.post("/", signUp);
// Login
router.post("/login", signIn);

// get specific user info
router.get("/:id", getOne);

module.exports = router;
