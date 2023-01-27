const express = require("express");
const userController = require("../controllers/user.contoller");

const router = express.Router();

router.get("/", userController.getUsers)
router.post("/", userController.createUser)
router.post("/login", userController.login)

module.exports = router;
