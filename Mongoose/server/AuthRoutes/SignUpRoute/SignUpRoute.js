const express = require("express")
const SignUpAuthController =require("../../Controllers/SignUpAuthController/SignUpAuthController")
const SignUpRoute = express.Router()

SignUpRoute.post("/signup",SignUpAuthController)

module.exports = SignUpRoute