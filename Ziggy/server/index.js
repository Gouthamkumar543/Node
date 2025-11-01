const express = require("express")
const cors = require("cors")
const dataBaseConnection = require("./dataBaseCofig/DataBaseConfig")
const authRoute = require("./Routes/authRoute")
const addRestaurantROute = require("./Routes/restaurantRoute")
require("dotenv").config()

const Port = process.env.Port

const app = express()
app.use(express.json())
app.use(cors())

dataBaseConnection()
app.use("/vendors/auth",authRoute)
app.use("/vendors",addRestaurantROute)

app.listen(Port,()=>{
    console.log("http://localhost:7000")
})