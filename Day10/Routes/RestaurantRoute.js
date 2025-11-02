const express = require("express")
const router = express.Router()
const verifytoken = require("../MiddleWares/verifyToken")
const { restaurantController, uploads } = require("../Controllers/RestaurantController")

router.post("/add-restaurant", verifytoken, uploads.single("image"), restaurantController)

module.exports = router