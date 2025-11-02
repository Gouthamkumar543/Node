const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    userName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    restaurants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "restaurants"
    }]
})

module.exports = mongoose.model("admins",adminSchema)