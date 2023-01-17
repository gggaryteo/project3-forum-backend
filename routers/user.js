const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { currentUser, updateUser } = require("../controllers/singleUserController");

//* Current User
router.get("/", verifyToken, currentUser);
//* Update User
router.put("/", verifyToken, updateUser);

module.exports = router;
