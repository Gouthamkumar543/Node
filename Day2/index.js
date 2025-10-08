// const http = require("http")

// const server = http.createServer((req, res) => {
//     if (req.url == "/") {
//         res.end("Welcom")
//     }

//     if (req.url == "/recipies") {
//         let recipies = {
//             stauts: 301,
//             Data: [{
//                 name: "chicken",
//                 item: "non-veg"
//             }, {
//                 name :"Panner",
//                 item:"veg"
//             }]
//         }
//         res.end(JSON.stringify(recipies))
//     }

//     if (req.url == "/cart") {
//         res.end("Cart items")
//     }
// })

// server.listen("8000")   

const { default: axios } = require("axios");
const http = require("http")
const url = require("url")

const server = http.createServer(async (req, res) => {
    // console.log(url.parse)
    // const parsedUrl = url.parse("http://localhost:5000", true)
    const parsedUrl = url.parse(req.url, true)
    console.log(parsedUrl);

    const query = parsedUrl.query
    const pathname = parsedUrl.pathname

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.write("Welcome to the products website")
        res.end()
    } else if (req.method === "GET" && pathname === "/products") {
        try {
            const response = await axios.get("https://dummyjson.com/products");
            // console.log(response);

            const Data = response.data.products;
            // console.log(Data);

            if (query.id) {
                const FilteredData = Data.filter(x => x.id === Number(query.id))
                res.writeHead(200, { "content-type": "application/json" })
                res.write(JSON.stringify(FilteredData))
                return res.end()
            }

            if(query.category){
                const FilteredData = Data.filter(x=>x.category === query.category)
                res.writeHead(200,{"content-type":"application/json"})
                res.write(JSON.stringify(FilteredData))
                return res.end()
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(Data));
            res.end();

        } catch (err) {
            console.log(err);
        }
    } else {
        res.writeHead(404, { "content-type": "text/plain" })
        res.write("No data found")
        res.end()
    }
})

server.listen(5000, () => {
    console.log("http://localhost:5000");
})