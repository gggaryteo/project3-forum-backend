const express = require("express");
const router = express.Router();
// const { signUp, signIn, getOne } = require("../controllers/usersController");

const { postLike } = require("../controllers/junctionController");

// // Register
// router.post("/", signUp);
// // Login
// router.post("/login", signIn);

// http://localhost:3001/api/junction/post
router.post("/post", postLike);

module.exports = router;
