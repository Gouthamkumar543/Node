import http from "http";
import url from "url";

const data = [{
    "id":1,
    "name":"goutham",
    "age":22,
    "gender":"male"
},{
    "id":2,
    "name":"naveen",
    "age":22,
    "gender":"male"
},{
    "id":3,
    "name":"yathish",
    "age":22,
    "gender":"male"
}]

const server = http.createServer((req,res)=>{
    // console.log(url.parse("http:/localhost:4000/products?id=1"));
    const pasredUrl = url.parse(req.url,true)
    console.log(pasredUrl);

    const pathname = pasredUrl.pathname
    const query = pasredUrl.query

    if(req.method === "GET" && pathname === "/"){
        res.writeHead(200,{"content-type":"text/plain"})
        res.write("welcome to queryparams")
        res.end()
    }else if(req.method === "GET" && pathname === "/products"){
        if(query.id){
            const filtereddata = data.filter(x=>x.id === Number(query.id))
            res.writeHead(200,{"content-type":"application/json"})
            res.write(JSON.stringify(filtereddata))
            return res.end()
        }
        if(query.name){
            const filtereddata = data.filter(x=>x.name === query.name)
            res.writeHead(200,{"content-type":"application/json"})
            res.write(JSON.stringify(filtereddata))
            return res.end()
        }
        res.writeHead(200,{"content-type":"application/json"})
        res.write(JSON.stringify(data))
        res.end()
    }else{
        res.writeHead(500,{"content-type":"text/plain"})
        res.write("no data found")
        res.end()
    }
})

server.listen(5000,()=>{
    console.log("server running on http://localhost:5000");
})