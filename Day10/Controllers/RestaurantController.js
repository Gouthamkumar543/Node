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

const getData = async (req, res) => {
    try {
        const data = await restaurantSchema.find().populate("products")
        if (!data) {
            return res.status(404).json({ message: "no data found" })
        }
        res.status(200).json({ data })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const singleResaurant = async (req, res) => {
    const restaurantId = req.params.id
    try {
        const restaurantFound = await restaurantSchema.findById(restaurantId).populate("products")
        if (!restaurantFound) {
            return res.status(404).json({ message: "no data found" })
        }
        res.status(200).json(restaurantFound)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const deleteRestaurant = async (req, res) => {
    const restaurantId = req.params.id
    try {
        await restaurantSchema.findByIdAndDelete(restaurantId)
        res.status(200).json({ message: "deleted sucessfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const updateRestaurant = async (req, res) => {
    const restaurantId = req.params.id
    const { restaurantName, location } = req.body
    const file = req.file
    try {
        const image = await cloudinary.uploader.upload(file.path)
        await restaurantSchema.findByIdAndUpdate(restaurantId, { restaurantName, location, image: image.secure_url }, { new: true })
        res.status(201).json({ message: "updated sucessfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports = { restaurantController, uploads, getData, singleResaurant, deleteRestaurant ,updateRestaurant}