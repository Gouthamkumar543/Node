const express = require("express")
const cors = require("cors")
const imageRouter = require("./imageRouter")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/",imageRouter)

app.listen(7000,(req,res)=>{
    console.log("http://localhost:7000");
})