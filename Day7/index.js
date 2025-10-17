const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())

function readFile() {
    const data = fs.readFileSync("data.json", "utf-8")
    return JSON.parse(data)
}

function writeFile(x) {
    fs.writeFileSync("data.json", JSON.stringify(x), "utf-8")
}

app.get("/", (req, res) => {
    res.send("Welcome to website")
})

app.get("/users", (req, res) => {
    const data = readFile()
    const users = data.users
    // console.log(users);

    res.status(200).json(users)
})

app.get("/users/:name", (req, res) => {
    const userName = req.params.name
    const data = readFile()
    const userFound = data.users.filter(x => x.name.toLowerCase() === userName.toLowerCase())
    if (userFound.length === 0) {
        return res.status(404).send("No user found")
    }
    res.status(200).json(userFound)
})

app.post("/users", (req, res) => {
    const newUser = { id: Date.now(), ...req.body }

    if (newUser.role === "user") {
        const data = readFile()
        data.users.push(newUser)
        writeFile(data)
        res.status(201).send("New User added successfully")
    } else {
        res.status(400).send("Check the role to add")
    }
})

app.delete("/users/:name",(req,res)=>{
    const userName = req.params.name
    let data = readFile()
    const filteredData = data.users.filter(x=>x.name.toLowerCase() !== userName.toLowerCase())

    if(data.users.length === filteredData.length){
        return res.status(404).send("No user found to delete")
    }

    data.users = filteredData
    writeFile(data)
    res.status(200).send("User deleted sucessfully")
})

app.get("/admins", (req, res) => {
    const data = readFile()
    const admins = data.admins
    // console.log(admins);

    res.status(200).json(admins)
})

app.get("/admins/:name", (req, res) => {
    const adminName = req.params.name
    const data = readFile()
    const adminFound = data.admins.filter(x => x.name.toLowerCase() === adminName.toLowerCase())
    if (adminFound.length === 0) {
        return res.status(404).send("No admin found")
    }
    res.status(200).json(adminFound)
})

app.post("/admins", (req, res) => {
    const newAdmin = { id: Date.now(), ...req.body }

    if (newAdmin.role === "admin") {
        const data = readFile()
        data.admins.push(newAdmin)
        writeFile(data)
        res.status(201).send("New admin added sucessfully")
    } else {
        res.status(400).send("check the role to add")
    }
})

app.delete("/admins/:name",(req,res)=>{
    const adminName = req.params.name
    let data = readFile()
    const filteredData = data.admins.filter(x=>x.name.toLowerCase() !== adminName.toLowerCase())
    
    if(data.admins.length === filteredData.length){
        return res.status(404).send("No admin found")
    }

    data.admins = filteredData
    writeFile(data)
    res.status(200).send("Admin deleted sucessfully")
})

app.listen("5000", () => {
    console.log("http://localhost:5000");
})