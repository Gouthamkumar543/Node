const express = require("express")
const userRoute = require("./userServer")
const adminRoute = require("./adminServer")
const app = express()

app.use(express.json())

app.use("/users",userRoute)
app.use("/admins",adminRoute)

app.listen(4000,(req,res)=>{
    console.log("http://localhost:4000");
})