const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  allPosts,
  createPost,
  singlePost
} = require("../controllers/postsController");

//? All Posts - by Author/by Tag/Favorited by user
router.get("/", verifyToken, allPosts);
//* Create Post
router.post("/", verifyToken, createPost);
// Single Post by slug
router.get("/:slug", verifyToken, singlePost);

const commentsRoutes = require("./comments");
//> Comments routes
router.use("/", commentsRoutes);

module.exports = router;
