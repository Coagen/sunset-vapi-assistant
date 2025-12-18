const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../admin");
const { getAllRooms } = require("../rooms");

router.get("/dashboard", getAdminStats);
router.get("/rooms", getAllRooms);

module.exports = router;