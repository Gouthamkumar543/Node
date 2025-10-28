const express = require("express")
const fs = require("fs")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const dotEnv = require("dotenv")

const router = express.Router()

function readFile() {
    const data = fs.readFileSync("data.json", "utf-8")
    return JSON.parse(data)
}

function writeFile(item) {
    fs.writeFileSync("data.json", JSON.stringify(item), "utf-8")
}

dotEnv.config()

const cloud_name = process.env.cloud_name
const api_key = process.env.api_key
const api_secret = process.env.api_secret

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
})

const storeMulter = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "imagesStorage/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storeMulter })

router.post("/images", upload.single("imageFile"), async (req, res) => {
    // console.log(req.file);
    try {
        const data = readFile()
        const uploadedFile = await cloudinary.uploader.upload(req.file.path)
        // console.log(uploadedFile);
        data.push({url: uploadedFile.secure_url})
        writeFile(data)
        res.status(201).send("uploaded done")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router