const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
    shopname:{type:String},
    location:{type:String},
    images:[
        {
            url:{
                type:String
            }
        }
    ],
    user:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ]
})

module.exports = mongoose.model("shopsdatas",shopSchema)