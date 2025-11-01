const vendorSchema = require("../Modals/vendorSchema")
const restaurantSchema = require("../Modals/restaurantSchema")
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

const upload = multer({ storage: storage })

const addRestaurant = async (req, res) => {
    const { restaurantname, location, category, region, offer } = req.body
    const files = req.files
    try {
        const vendor = await vendorSchema.findById(req.vendorId)
        if (!vendor) {
            return res.status(404).json({ message: "vendor not found" })
        }
        const imageUploaderFile = files.map(x => cloudinary.uploader.upload(x.path))
        const result = await Promise.all(imageUploaderFile)
        const images = result.map(x=>({url:x.secure_url}))
        const newRestaurant = new restaurantSchema({
            restaurantname,
            location,
            region,
            offer,
            category,
            vendorId: vendor._id,
            image: images
        })        
        await newRestaurant.save()
        res.status(201).json({ message: "Restaurant saved successfully",images })
    } catch (err) {
        console.error(err);
        res.status(500).send("internal server")
    }
}

module.exports = { addRestaurant, upload }