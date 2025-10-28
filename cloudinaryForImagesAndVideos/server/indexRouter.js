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
    // destination:(req,file,cb)=>{
    //     cb(null,"Images/")
    // },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storeMulter })

router.get("/images",(req,res)=>{
    const data =readFile()
    res.status(200).json(data.posts)
})

router.post("/images", upload.array("image", 10), async(req, res) => {
    // console.log(req.files);
    const files = req.files
    const images = { id: Date.now(), img: [] }
    for (const file of files) {
        const uploadFile = await cloudinary.uploader.upload(file.path)
        images.img.push({"url":uploadFile.secure_url})
        // console.log(images);
    }
    const data = readFile()
    data.posts.push(images)
    writeFile(data)
    res.status(201).send("Uploaded Done")
})

module.exports = router