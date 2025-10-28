const express = require("express")
const fs = require("fs")

const router = express.Router()

function readFile() {
    const data = fs.readFileSync("data.json","utf-8")
    return JSON.parse(data)
}

function writFile(item) {
    fs.writeFileSync("data.json",JSON.stringify(item),"utf-8")
}

router.get("/food",(req,res)=>{
    const data = readFile()
    res.status(200).json(data.food)
})

router.get("/food/:id",(req,res)=>{
    const foodId = req.params.id
    const data = readFile()
    const itemFound = data.food.filter(x=>x.id === Number(foodId))
    res.status(200).json(itemFound)
})

router.post("/food",(req,res)=>{
    const newFood = {"id":Date.now(),...req.body}
    if(!req.body){
        return res.status(404).send("No data found to added")
    }
    const data = readFile()
    data.food.push(newFood)
    writFile(data)
    res.status(201).send("New recipie addded sucessfully")
})

router.put("/food/:id",(req,res)=>{
    const foodId = req.params.id
    const updatedFood = req.body
    const data = readFile()
    const index = data.food.findIndex(x=>x.id === Number(foodId))
    if(index === -1){
        return res.status(404).send("No item found with the id")
    }
    updatedFood.id = data.food[index].id
    data.food[index] = updatedFood
    writFile(data)
    res.status(201).send("updated sucessfully")
})

router.delete("/food/:id",(req,res)=>{
    const foodId = req.params.id
    const data = readFile()
    const dataLength = data.food.length
    data.food = data.food.filter(x=>x.id !== Number(foodId))
    if(dataLength === data.food.length){
        return res.status(404).send("No item found with the id")
    }
    writFile(data)
    res.status(200).send("item deleted sucessfully")
})

module.exports =router