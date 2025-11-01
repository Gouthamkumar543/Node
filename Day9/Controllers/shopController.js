const shopSchema = require("../Modal/shopSchema")
const authSchema = require("../Modal/authSchema")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
require("dotenv").config()

const cloud_name = process.env.cloud_name
const api_key = process.env.api_key
const api_secret = process.env.api_secret

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage })

const shopController = async (req, res) => {
    const { shopname, location } = req.body
    const files = req.files
    try {
        const findUser = await authSchema.findById(req.userId)
        if (!findUser) {
            return res.status(404).send("no user found")
        }
        const imagesUpload = files.map(x => cloudinary.uploader.upload(x.path))
        // console.log(imagesUpload,"37 line");
        const result = await Promise.all(imagesUpload)
        // console.log(result,"39 line");
        const images = result.map(x => ({ url: x.secure_url }))
        const newShop = new shopSchema({
            shopname,
            location,
            images: images
        })
        await newShop.save()
        res.status(201).send("done")
    } catch (err) {
        console.error(err)
    }
}

module.exports = { shopController, upload }