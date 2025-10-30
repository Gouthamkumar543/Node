const express = require("express")
const cors = require("cors")
const dbConnection = require("./DataBaseCofig/DataBaseConfig")
const SignUpRouter = require("./AuthRoutes/SignUpRoute/SignUpRoute")

const app = express()

app.use(express.json())
app.use(cors())

dbConnection()

app.use("/jobportal/auth",SignUpRouter)

app.listen(7000,()=>{
    console.log("http://localhost:7000");
})