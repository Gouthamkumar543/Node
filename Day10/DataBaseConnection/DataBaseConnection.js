const mongoose =require("mongoose")
require("dotenv").config()

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.mongoDbConnection,{
            dbName:"Data"
        })
        console.log("Connected");
    } catch (error) {
        console.error(error);
    }
}

module.exports = dbConnect