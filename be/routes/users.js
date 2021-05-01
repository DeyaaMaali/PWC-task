var express = require("express");
var router = express.Router();
const userControllers = require("../app/controllers/userControllers");
const verifyToken = require("../app/helpers/users/verifyToken");
const verifyRefreshToken = require("../app/helpers/users/verifyRefreshToken");

router.post("/register", userControllers.store);
router.post("/login", userControllers.login);
router.post("/logout", verifyToken, userControllers.logout);
router.get("/refreshToken", verifyRefreshToken, userControllers.refreshToken);
router.get("/complaints", verifyToken, userControllers.getUserComplaints);

module.exports = router;
