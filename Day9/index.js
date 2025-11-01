const express = require("express");
const cors = require("cors");
const dbConnect = require("./DataBaseConfig/DataBaseConfig");
const shopRoute = require("./Routes/shopRoute")
const signupRoute = require("./Routes/authRoute");

require("dotenv").config();

const app = express();
const PORT = process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnect();

app.use("/auth", signupRoute);
app.use("/",shopRoute)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
