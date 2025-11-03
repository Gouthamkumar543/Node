const express = require("express")
const { signUpController, logInController, getData, getSingleAdminData, deleteAdmin, updateAdmin } = require("../Controllers/AdminController")
const router = express.Router()

router.get("/", getData)
router.get("/:id", getSingleAdminData)
router.post("/signup", signUpController)
router.post("/login", logInController)
router.delete("/:id", deleteAdmin)
router.put("/:id", updateAdmin)

module.exports = router