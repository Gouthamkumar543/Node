const express = require("express")
const cors = require("cors")
const imageRouter = require("./indexRouter")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/",imageRouter)

app.listen(7000, () => {
    console.log("http://localhost:7000")
})