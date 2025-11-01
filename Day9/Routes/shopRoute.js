const express = require("express");
const verifyToken = require("../MiddlerWares/verifyToken");
const { upload, shopController } = require("../Controllers/shopController");
const router = express.Router();

router.post("/shop", verifyToken, upload.array("images", 5), shopController);

module.exports = router;
