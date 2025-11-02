const jwt = require("jsonwebtoken")
const adminSchema = require("../Modals/AdminSchema")
require("dotenv").config()

const Secret_key = process.env.secretKey

const verifytoken = async (req, res, next) => {
    const token = req.headers.token
    if (!token) {
        return res.status(400).json({ message: "Token required" })
    }
    try {
        const decode = jwt.verify(token, Secret_key)
        const findAdmin = await adminSchema.findById(decode.adminId)
        if (!findAdmin) {
            return res.status(404).json({ message: "no admin found" })
        }
        req.adminId = findAdmin._id
        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports = verifytoken