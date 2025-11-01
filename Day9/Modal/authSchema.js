const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    shop: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "shopsdatas"
        }
    ]
});

module.exports = mongoose.model("users", signUpSchema);
