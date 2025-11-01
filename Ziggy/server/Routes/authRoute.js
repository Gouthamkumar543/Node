const express = require("express")
const { signUpController, logInController } = require("../Controllers/authController")

const router = express.Router()

router.post("/signup", signUpController)
router.post("/login",logInController)

module.exports = router