const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  allPosts,
  createPost
} = require("../controllers/postsController");

//? All Posts - by Author/by Tag/Favorited by user
router.get("/", verifyToken, allPosts);
//* Create Post
router.post("/", verifyToken, createPost);

module.exports = router;
