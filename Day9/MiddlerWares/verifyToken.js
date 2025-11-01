const jwt = require("jsonwebtoken")
const signUpSchema = require("../Modal/authSchema")
require("dotenv").config()

const secret_key = process.env.secretKey

const verifyToken = async (req, res, next) => {
    const token = req.headers.token
    if (!token) {
        return res.status(404).send("token required")
    }
    try {
        const decodeToken = jwt.verify(token, secret_key)
        // console.log(decodeToken,"14 line");
        const findUser = await signUpSchema.findById(decodeToken.userId)
        // console.log(findUser,"16 line");
        if (!findUser) {
            return res.status(404).send("user not found")
        }
        req.userId = findUser._id
        // console.log(req.userId,"20 line");
        next()
    } catch (err) {
        console.error(err);
    }
}

module.exports = verifyToken