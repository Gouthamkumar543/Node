const adminSchema = require("../Modals/AdminSchema")
const restaurantSchema = require("../Modals/RestaurantSchema")
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

const uploads = multer({ storage })

const restaurantController = async (req, res) => {
    const { restaurantName, location } = req.body
    const file = req.file
    // console.log(file);
    try {
        const findAdmin = await adminSchema.findById(req.adminId)
        if (!findAdmin) {
            return res.status(404).json({ message: "noadmin found" })
        }
        const image = await cloudinary.uploader.upload(file.path)
        // console.log(image);        
        const newRestaurant = new restaurantSchema({
            restaurantName,
            location,
            image: image.secure_url
        })
        const savedRestaurant = await newRestaurant.save()
        findAdmin.restaurants.push(savedRestaurant)
        await findAdmin.save()
        res.status(201).json({ message: "restaurant added sucessfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports = { restaurantController, uploads }