const http = require("http")

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.end("Welcom")
    }

    if (req.url == "/recipies") {
        let recipies = {
            stauts: 301,
            Data: [{
                name: "chicken",
                item: "non-veg"
            }, {
                name :"Panner",
                item:"veg"
            }]
        }
        res.end(JSON.stringify(recipies))
    }
    
    if (req.url == "/cart") {
        res.end("Cart items")
    }
})

server.listen("8000")   