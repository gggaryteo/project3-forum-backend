const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { getProfile } = require("../controllers/profiles");

//? Profile
router.get("/:username", verifyToken, getProfile);

module.exports = router;
