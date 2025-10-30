const mongoose = require("mongoose")
require("dotenv").config()

async function dbConnection() {
    try{
        // console.log(process.env.db_connection);
        await mongoose.connect(process.env.db_connection,{dbName:"jobfinder"})
        // console.log("connected");
    }catch(err){
        console.log(err);
    }
}

module.exports = dbConnection