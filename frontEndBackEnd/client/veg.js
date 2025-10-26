const express = require("express")
const fs = require("fs")
const router = express.Router()

function readFile() {
    const data = fs.readFileSync("data.json", "utf-8")
    return JSON.parse(data)
}

function writeFile(item) {
    fs.writeFileSync("data.json", JSON.stringify(item), "utf-8")
}

router.get("/", (req, res) => {
    const data = readFile()
    res.status(200).json(data.veg)
})

router.get("/:name", (req, res) => {
    const vegName = req.params.name
    const data = readFile()
    const vegItem = data.veg.filter(x => x.name === vegName)
    if (vegItem.length === 0) {
        return res.status(404).send(`No item found ${vegName}`)
    }
    res.status(200).json(vegItem)
})

router.post("/", (req, res) => {
    const newVeg = { "id": Date.now(), ...req.body }
    if (newVeg.type === "veg") {
        const data = readFile()
        data.veg.push(newVeg)
        writeFile(data)
        return res.status(201).send("Item added sucessfully")
    }
    res.status(404).send("check the type")
})

router.delete("/:name", (req, res) => {
    const vegName = req.params.name
    const data = readFile()
    const dataLength = data.veg.length
    data.veg = data.veg.filter(x => x.name !== vegName)
    if (dataLength === data.veg.length) {
        return res.status(404).send(`No item found ${vegName}`)
    }
    writeFile(data)
    res.status(200).send("Item deleted sucessfully")
})

router.put("/:name", (req, res) => {
    const vegName = req.params.name
    const updatedItem = req.body
    const data = readFile()
    const index = data.veg.findIndex(x => x.name === vegName)
    if (index === -1 || updatedItem.type !== "veg") {
        return res.status(404).send(`No item found ${vegName} or check the type`)
    }
    updatedItem.id = data.veg[index].id
    data.veg[index] = updatedItem
    writeFile(data)
    res.status(201).send(`Updated ${vegName} sucessfully`)
})

module.exports = router