const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants"
    }]
})

module.exports = mongoose.model("vendors", vendorSchema)