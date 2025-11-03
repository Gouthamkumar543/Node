const express = require("express")
const { productController, uploads, getData, singleProduct, deleteProduct, updateProduct } = require("../Controllers/ProductController")
const router = express.Router()

router.get("/", getData)
router.get("/:id", singleProduct)
router.post("/:id", uploads.single("image"), productController)
router.delete("/:id", deleteProduct)
router.put("/:id", uploads.single("image"), updateProduct)

module.exports = router