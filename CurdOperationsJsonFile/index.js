// const http = require("http")
// const url = require("url")

// const server = http.createServer((req,res)=>{
//     const parsedUrl = url.parse(req.url,true)
//     const pathname = parsedUrl.pathname
//     const query = parsedUrl.query

//     if(pathname == "/users" && req.method === "GET"){
//         return res.end("welcome to server")
//     }   
// })

// server.listen(4000,()=>{
//     console.log("server running on http://localhost:4000")
    
// })



const http = require("http")
const url = require("url")
const fs = require("fs");

function ReadFile(){
    const data = fs.readFileSync("data.json","utf-8")
    return JSON.parse(data)
}

function WriteFile(users){
    fs.writeFileSync("data.json",JSON.stringify(users),"utf-8")
}


const server = http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url,true)
    const pathname = parsedUrl.pathname
    const query = parsedUrl.query

    if(pathname === "/"){
        res.writeHead(200,{"content-type":"text/plain"})
        res.write("Welcome to server")
        return res.end()
    }

    if(pathname === "/users" && req.method === "GET"){
        res.writeHead(200,{"content-type":"application/json"})
        const User = ReadFile()
        res.write(JSON.stringify(User))
        return res.end()
    }

    if(pathname === "/users" && req.method === "POST"){
        let body = ""
        req.on("data",(chunk)=>{
            body += chunk
        })
        req.on("end",()=>{
            const newUser = JSON.parse(body)
            res.writeHead(200,{"content-type":"application/json"})
            let user = ReadFile()
            // user.push(newUser)
            user = [...user,newUser]
            newUser.id = user.length
            WriteFile(user)
            res.write(JSON.stringify({message:"Added Sucessfully !!!",newUser}))
            return res.end()
        })
    }

    if(pathname === "/users" && req.method === "DELETE"){
        if(query.id){
            const user = ReadFile()
            const FilteredData = user.filter(x=>x.id !== Number(query.id))
            WriteFile(FilteredData)
            res.writeHead(200,{"content-type":"text/plain"})
            res.write("Deleted SuccessFully")
            return res.end() 
        }else{
            res.writeHead(400,{"content-type":"text/plain"})
            res.write("Deleted un sucesss")
            return res.end()
        }
    }
})

server.listen(4000,()=>{
    console.log("server Running http://localhost:4000")
})