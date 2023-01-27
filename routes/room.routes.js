const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room.contoller");
// const auth = require("../middleware/auth");
// const authMiddlewares = [auth];

router.post("/", roomController.createRoom)

module.exports = router;
