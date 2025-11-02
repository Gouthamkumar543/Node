const express = require("express")
const cors = require("cors")
const dbConnect = require("./DataBaseConnection/DataBaseConnection")
const productRoute = require("./Routes/ProductRoute")
const adminRouter = require("./Routes/AdminRoute")
const restaurantRouter = require("./Routes/RestaurantRoute")
require("dotenv").config()

const PORT = process.env.Port

const app = express()

dbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/admin", adminRouter)
app.use("/admin", restaurantRouter)
app.use("/restaurant", productRoute)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})