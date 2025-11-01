const vendorSchema = require("../Modals/vendorSchema")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret_key = process.env.secretKey

const verifyToken = async (req, res, next) => {
    const Token = req.headers.token
    if (!Token) {
        return res.status(401).send("token required")
    }
    try {
        const decode = jwt.verify(Token, secret_key)
        const findVendor = await vendorSchema.findById(decode.vendorId)
        if (!findVendor) {
            return res.status(404).send("vendor not found")
        }
        req.vendorId = findVendor._id
        next()
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "invalid token" })
    }
}

module.exports = verifyToken