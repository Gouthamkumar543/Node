const mongoose = require("mongoose")
require("dotenv").config()

async function dataBaseConnection(req,res) {
    try{
        await mongoose.connect(process.env.mongoDbConnection,{
            dbName:"data"
        })
        console.log("mongoDB connected");
    }catch(err){
        console.log(err);
    }
}

module.exports = dataBaseConnection