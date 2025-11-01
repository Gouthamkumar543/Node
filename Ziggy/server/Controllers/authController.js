const { json } = require("express")
const vendorSchema = require("../Modals/vendorSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret_key = process.env.secretKey

const signUpController = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const alreadyExists = await vendorSchema.findOne({ email })
        if (alreadyExists) {
            return res.status(400).json({ message: "user already existed" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newVendor = new vendorSchema({
            name,
            email,
            password: hashPassword
        })
        await newVendor.save()
        res.status(201).json({ message: "vendor added sucessfully" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to signup" })
    }
}

const logInController = async (req, res) => {
    const { email, password } = req.body
    try {
        const vendor = await vendorSchema.findOne({ email })
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ message: "invalid email or password" })
        }
        const token = jwt.sign({ vendorId: vendor._id }, secret_key, { expiresIn: "1h" })
        console.log(token);
        res.status(200).json({ message: "login sucessfully",token })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "internal server issue" })
    }
}

module.exports = { signUpController, logInController }