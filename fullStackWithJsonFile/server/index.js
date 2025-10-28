const express = require("express")
const cors = require("cors")
const serverRouter = require("./serverRouter")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/",serverRouter)

app.listen(5000,()=>{
    console.log("http://localhost:5000");
})