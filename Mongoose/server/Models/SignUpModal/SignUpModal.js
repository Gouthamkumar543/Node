const mongoose = require("mongoose")

const SignUpSchema =new mongoose.Schema({
    name:String,
    email:{type:String, unique:true},
    password:String,
    role:String
})

module.exports = mongoose.model("users",SignUpSchema)