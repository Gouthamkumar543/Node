const express = require("express")
const fs = require("fs")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const dotEnv = require("dotenv")
const router = express.Router()

dotEnv.config()
const cloud_name = process.env.cloud_name
const api_key = process.env.api_key
const api_secret = process.env.api_secret

function readFile() {
    const data = fs.readFileSync("data.json", "utf-8")
    return JSON.parse(data)
}

function writeFile(item) {
    fs.writeFileSync("data.json", JSON.stringify(item), "utf-8")
}

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
})

const storeMulter = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storeMulter })

router.get("/images", (req, res) => {
    const data = readFile()
    res.status(200).json(data.images)
})

router.post("/images", upload.single("imageFile"), async (req, res) => {
    try {
        // console.log(req.file)
        const data = readFile()
        const uploadedFile = await cloudinary.uploader.upload(req.file.path)
        // console.log(uploadedFile,"file uploaded");
        data.images.push(uploadedFile.secure_url)
        writeFile(data)
        res.status(201).send("added sucessfully")
    }catch(err){
        console.log(err)
    }
})

module.exports = router