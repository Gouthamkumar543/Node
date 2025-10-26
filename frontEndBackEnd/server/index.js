const express = require("express")
const cors = require("cors")
const app = express()
const nonvegRouter = require("./nonVeg") 
const vegRouter = require("./veg")

app.use(express.json())
app.use(cors())

app.use("/nonveg",nonvegRouter)
app.use("/veg",vegRouter)

app.listen(7000,()=>{
    console.log("http://localhost:7000"); 
})