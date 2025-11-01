const express = require("express");
const { signUpController, loginController } = require("../Controllers/authController");
const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);

module.exports = router;
