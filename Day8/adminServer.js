const express = require("express")
const fs = require("fs")
const router = express.Router()

function readFile() {
    const data = fs.readFileSync("data.json", "utf-8")
    return JSON.parse(data)
}

function writeFile(x) {
    fs.writeFileSync("data.json", JSON.stringify(x), "utf-8")
}

router.get("/", (req, res) => {
    const data = readFile()
    res.status(200).json(data.admins)
})

router.get("/:name", (req, res) => {
    const adminName = req.params.name
    const data = readFile()
    const filteredData = data.admins.filter(x => x.name === adminName)
    if (filteredData.length === 0) {
        return res.status(404).send("No user found with name")
    }
    res.status(200).json(filteredData)
})

router.post("/", (req, res) => {
    const newAdmin = { id: Date.now(), ...req.body }
    if (newAdmin.role === "admin") {
        const data = readFile()
        data.admins.push(newAdmin)
        writeFile(data)
        return res.status(201).send("New admin added sucessfully")
    }
    res.status(404).send("check the role")
})

router.delete("/:name", (req, res) => {
    const adminName = req.params.name
    let data = readFile()
    const originalLength = data.admins.length
    data.admins = data.admins.filter(x => x.name !== adminName)

    if (originalLength === data.admins.length) {
        return res.status(404).send("No admin found")
    }

    writeFile(data)
    res.status(200).send("Deleted sucessfully")
})

router.put("/:name", (req, res) => {
    const adminName = req.params.name
    const updatedAdmin = req.body
    let data = readFile()
    const index = data.admins.findIndex(x => x.name === adminName)

    if (index === -1 || updatedAdmin.role !== "admin") {
        return res.status(404).send("No admin found")
    }

    updatedAdmin.id = data.admins[index].id
    data.admins[index] = updatedAdmin
    writeFile(data)
    res.status(200).send("Updated sucessfully")
})

module.exports = router