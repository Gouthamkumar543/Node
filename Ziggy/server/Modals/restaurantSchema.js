const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    restaurantname: { type: String, required: true },
    location: { type: String },
    category: {
        type: [String],
        // enum: ["veg", "nonveg"]
    },
    region: {
        type: [String],
        // enum: ["northindian", "southindian", "japanese", "korean"]
    },
    offer: { type: String },
    image: [
        {
            url: {
                type: String,
            }
        }
    ],
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendors"
    }]
})

module.exports = mongoose.model("restaurants", restaurantSchema)