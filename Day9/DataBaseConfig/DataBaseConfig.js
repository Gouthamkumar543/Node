const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.mongoDbConnection, {
            dbName: "data",
        });
        console.log("connected");
    } catch (err) {
        console.error(err);
    }
};

module.exports = dbConnect;
