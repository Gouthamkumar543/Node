const express = require("express")
const router = express.Router()
const verifytoken = require("../MiddleWares/verifyToken")
const { restaurantController, uploads, getData, singleResaurant, deleteRestaurant, updateRestaurant } = require("../Controllers/RestaurantController")

router.get("/", getData)
router.get("/:id", singleResaurant)
router.post("/add-restaurant", verifytoken, uploads.single("image"), restaurantController)
router.delete("/:id", deleteRestaurant)
router.put("/:id",uploads.single("image"), updateRestaurant)

module.exports = router