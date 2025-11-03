const restaurantSchema = require("../Modals/RestaurantSchema")
const productSchema = require("../Modals/ProductSchema")
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

const productController = async (req, res) => {
    const { name, price } = req.body
    const restaurantId = req.params.id
    const file = req.file
    try {
        const findRestaurant = await restaurantSchema.findById(restaurantId)
        if (!findRestaurant) {
            return res.status(404).json({ message: "no restaurant found" })
        }
        const image = await cloudinary.uploader.upload(file.path)
        const newProduct = new productSchema({
            name,
            price,
            image: image.secure_url
        })
        const savedProduct = await newProduct.save()
        findRestaurant.products.push(savedProduct)
        await findRestaurant.save()
        res.status(201).json({ message: "Product saved" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const getData = async (req, res) => {
    try {
        const data = await productSchema.find()
        if (!data) {
            return res.status(404).json({ message: "no data found" })
        }
        res.status(200).json({ data })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const singleProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const productFound = await productSchema.findById(productId)
        if (!productFound) {
            return res.status(404).json({ message: "no data found" })
        }
        res.status(200).json(productFound)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        await productSchema.findByIdAndDelete(productId)
        res.status(200).json({ message: "deleted sucessfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id
    const { name, price } = req.body
    const file = req.file
    try {
        const image = await cloudinary.uploader.upload(file.path)
        await productSchema.findByIdAndUpdate(productId, { name, price, image: image.secure_url }, { new: true })
        res.status(201).json({ message: "updated sucessfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports = { productController, uploads, getData, singleProduct, deleteProduct, updateProduct }