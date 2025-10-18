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
        res.status(200).json(data.users)
    })

    router.get("/:name",(req,res)=>{
        const userName = req.params.name
        const data = readFile()
        const filteredData = data.users.filter(x=>x.name === userName)
        if(filteredData.length === 0){
            return res.status(404).send("No user found with name")
        }
        res.status(200).json(filteredData)
    })

    router.post("/", (req, res) => {
        const newUser = { id: Date.now(), ...req.body }

        if (newUser.role === "user") {
            const data = readFile()
            data.users.push(newUser);
            writeFile(data);
            return res.status(201).send("new user added sucessfully")
        }

        res.status(404).send("check the role")
    })

    router.delete("/:name",(req,res)=>{
        const userName = req.params.name
        let data = readFile()
        const originalLength = data.users.length
        data.users = data.users.filter(x=>x.name !== userName)
        
        if(originalLength === data.users.length){
            return res.status(404).send("No user found to delete")
        }

        writeFile(data)
        res.status(200).send("Deleted sucessfully")
    })

    router.put("/:name",(req,res)=>{
        const userName = req.params.name
        const updatedData = req.body
        let data = readFile()
        const index = data.users.findIndex(x=>x.name === userName)

        if(index === -1 || updatedData.role !== "user"){
            return res.status(404).send("user not found or check the role")
        }

        updatedData.id = data.users[index].id
        data.users[index] = updatedData
        writeFile(data)
        res.status(200).send("updated sucessfully")
    })

    module.exports = router