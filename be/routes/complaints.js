var express = require("express");
var router = express.Router();
const complaintsController = require("../app/controllers/complaintsController");
const verifyToken = require("../app/helpers/users/verifyToken");

router.get("/", verifyToken, complaintsController.getComplaints);
router.post("/", verifyToken, complaintsController.storeComplaint);
router.patch("/:id", verifyToken, complaintsController.updateComplaint);

module.exports = router;
