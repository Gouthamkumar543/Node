// const {Data,X} = require("./Data");

// console.log("Hi my name is Goutham kumar");

// console.log(10*8);

// let x = [10,20,30,50,3,45,6,7,8,8]

// x.forEach((item)=>{
//     console.log(item)
// })

// console.log("Hello");

// console.log(Data());
// console.log(X());

const { default: axios } = require("axios")
const http = require("http")
// console.log(http);

const server = http.createServer((req,res)=>{
    // console.log(req,"Req object"); 
    res.write("Welcome to the Server")
    res.end()
})

const server1 = http.createServer(async(req,res)=>{

    if(req.method === "GET" && req.url === "/"){
        res.write("Welcom to the server ...........")
        res.end()
    }else if(req.method === "GET" && req.url === "/products"){
        try{
            await axios.get("https://dummyjson.com/products")
            .then(x=>{
                console.log(x.data)
                res.write(JSON.stringify(x.data))
                res.end()
            })
        }catch(err){
            console.log(err)
        }
    }else if(req.method === "GET" && req.url === "/users"){
        try{
            await axios.get("https://dummyjson.com/users")
            .then(x=>{
                console.log(x.data)
                res.end(JSON.stringify(x.data))
            })
        }catch(err){
            console.log(err)
        }
    }else{
        res.end("No data found")
    }
})

server.listen(2000,()=>{
    console.log("http://localhost:2000")
})

server1.listen(5000,()=>{
    console.log("http://localhost:5000");
})