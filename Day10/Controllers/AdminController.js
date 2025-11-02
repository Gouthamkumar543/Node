const adminSchema = require("../Modals/AdminSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const Secret_key = process.env.secretKey

const signUpController = async (req, res) => {
    const { userName, email, password } = req.body
    try {
        const alreadyExists = await adminSchema.findOne({ email })
        if (alreadyExists) {
            return res.status(404).json({ message: "Admin already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newAdmin = new adminSchema({
            userName,
            email,
            password: hashPassword
        })
        await newAdmin.save()
        res.status(201).json({ message: "Admin add sucessfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const logInController = async (req, res) => {
    const { email, password } = req.body
    try {
        const findAdmin = await adminSchema.findOne({ email })
        if (!findAdmin || !(await bcrypt.compare(password, findAdmin.password))) {
            return res.status(404).json({ message: "invalid credentials" })
        }
        const token = jwt.sign({ adminId: findAdmin._id }, Secret_key, { expiresIn: "24h" })
        res.status(200).json({ message: "login sucessful", token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const getData = async (req, res) => {
    try {
        const data = await adminSchema.find().populate("restaurants")
        if (!data) {
            return res.status(404).json({ message: "no data found" })
        }
        res.status(200).json({ username: data.userName, data })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

const getSingleAdminData = async (req, res) => {
    const adminID = req.params.id
    try {
        const singleAdminData = await adminSchema.findById(adminID).populate({
            path: "restaurants",
            populate: {
                path: "products"
            }
        })

        if (!singleAdminData) {
            return res.status(404).json({ message: "no data found" })
        }
        res.status(200).json(singleAdminData)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })

    }
}

module.exports = { signUpController, logInController, getData, getSingleAdminData }