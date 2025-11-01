const signUpSchema = require("../Modal/authSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret_key = process.env.secretKey

const signUpController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const alreadyExists = await signUpSchema.findOne({ email });
        if (alreadyExists) {
            return res.status(400).send("User already exists");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new signUpSchema({
            name,
            email,
            password: hashPassword,
        });
        await newUser.save();
        res.status(201).send("saved sucessfully");
    } catch (err) {
        console.error(err);
    }
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findUser = await signUpSchema.findOne({ email });
        if (!findUser || !(await bcrypt.compare(password, findUser.password))) {
            return res.status(404).send("no user found");
        }
        const token = jwt.sign({ userId: findUser._id }, secret_key, { expiresIn: "1h" })
        res.status(200).json({ message: "user found", token, });
    } catch (err) {
        console.error(err);
    }
};

module.exports = { signUpController, loginController };
