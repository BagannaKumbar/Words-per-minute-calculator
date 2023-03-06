const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById, getUser } = require("../controllers/user");


router.param("userId", getUserById);
//need to isAuthenticated also 
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

module.exports = router;
