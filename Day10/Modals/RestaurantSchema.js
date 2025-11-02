const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String },
    location: { type: String },
    image: { type: String },
    products:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: "products"
    }]
})

module.exports = mongoose.model("restaurants", restaurantSchema)