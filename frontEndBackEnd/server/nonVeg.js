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
    res.status(200).json(data.nonveg)
})

router.get("/:name", (req, res) => {
    const nonvegName = req.params.name
    const data = readFile()
    const itemFound = data.nonveg.filter(x => x.name === nonvegName)
    if (itemFound.length === 0) {
        return res.status(404).send(`No item found ${nonvegName}`)
    }
    res.status(200).json(itemFound)
})

router.post("/", (req, res) => {
    const newNonveg = { "id": Date.now(), ...req.body }
    if (newNonveg.type === "nonveg") {
        const data = readFile()
        data.nonveg.push(newNonveg)
        writeFile(data)
        return res.status(201).send("added sucessfully")
    }
    res.status(404).send("please select the type of the dish")

})

router.delete("/:name", (req,res)=> {
    const nonvegName = req.params.name
    const data = readFile()
    const dataLength = data.nonveg.length
    data.nonveg = data.nonveg.filter(x=>x.name !== nonvegName)
    if(dataLength === data.nonveg.length){
        return res.status(404).send("No item found to delete")
    }
    writeFile(data)
    res.status(200).send("Item deleted sucessfully")
})

router.put("/:id",(req,res)=>{
    const nonvegId = req.params.id
    const updatedItem = req.body
    const data = readFile()
    const index = data.nonveg.findIndex(x=> x.id === Number(nonvegId))
    if(index === -1 || updatedItem.type !== "nonveg"){
        return res.status(404).send(`No item found ${nonvegId} or check the type`)
    }
    updatedItem.id = data.nonveg[index].id
    data.nonveg[index] = updatedItem
    writeFile(data)
    res.status(201).send(`Updated sucessfully`)
})

module.exports = router