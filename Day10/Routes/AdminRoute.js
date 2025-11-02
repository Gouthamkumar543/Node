const express = require("express")
const { signUpController, logInController, getData, getSingleAdminData } = require("../Controllers/AdminController")
const router = express.Router()

router.get("/", getData)
router.get("/:id", getSingleAdminData)
router.post("/signup", signUpController)
router.post("/login", logInController)

module.exports = router