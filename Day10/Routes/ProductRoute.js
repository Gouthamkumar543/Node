const express = require("express")
const { productController, uploads } = require("../Controllers/ProductController")
const router = express.Router()

router.post("/:id", uploads.single("image"), productController)

module.exports = router