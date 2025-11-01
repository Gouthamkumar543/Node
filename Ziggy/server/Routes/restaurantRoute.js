const express = require("express")
const verifyToken = require("../Middlewares/verifyToken")
const { addRestaurant, upload } = require("../Controllers/restaurantController")
const router = express.Router()

router.post("/add-restaurant", verifyToken, upload.array("image", 10), addRestaurant)

module.exports = router