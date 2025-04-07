const http = require("http")
const url = require("url")

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname
    const query = parsedUrl.query

    let data = [{
        "id": 1,
        "name": "vivo",
        "price": 30000,
        "category": "mobile"
    }, {
        "id": 2,
        "name": "oppo",
        "price": 35000,
        "category": "mobile"
    }, {
        "id": 3,
        "name": "acer",
        "price": 45000,
        "category": "laptop"
    }, {
        "id": 4,
        "name": "dell",
        "price": 60000,
        "category": "laptop"
    }]

    if (pathname === "/") {
        res.writeHead(200, { "content-type": "text/plain" })
        res.write("Welcome to the website")
        return res.end()
    } else if (pathname === "/products") {
        if (req.method === "GET") {
            if (query.id) {
                const filteredData = data.filter(x => x.id === Number(query.id))
                if (filteredData.length > 0) {
                    res.writeHead(200, { "content-type": "application/json" })
                    res.write(JSON.stringify(filteredData))
                    return res.end()
                } else {
                    res.writeHead(404, { "content-type": "text/plain" })
                    res.write("No Item Found with the ID")
                    return res.end()
                }
            } else {
                res.writeHead(200, { "content-type": "application/json" })
                res.write(JSON.stringify(data))
                return res.end()
            }
        }

        if (req.method === "DELETE") {
            if (query.id) {
                const DataLenght = data.length
                data = data.filter(x => x.id !== Number(query.id))
                if (data.length < DataLenght) {
                    res.writeHead(200, { "content-type": "application/json" })
                    res.write(JSON.stringify(data))
                    return res.end()
                } else {
                    res.writeHead(404, { "content-type": "text/plain" })
                    res.write("No Data Found")
                    return res.end()
                }
            }
        }

        if (req.method === "POST") {
            let body = ""
            req.on("data", (chunk) => {
                body += chunk
                console.log(body)
            })
            req.on("end", () => {
                let postData = JSON.parse(body)
                res.writeHead(201, { "content-type": "application/json" })
                res.write(JSON.stringify({ message: "New Item Added Sucessfully", postData }))
                return res.end()
            })
        }

        if (req.method === "PUT") {
            let body = ""
            req.on("data", (chunk) => {
                body += chunk
            })
            req.on("end", () => {
                let PutData = JSON.parse(body)
                res.writeHead(200, { "content-type": "application/json" })
                res.write(JSON.stringify({ message: "Updated Sucessfully", PutData }))
                return res.end()
            })
        }
    } else {
        res.writeHead(404, { "content-type": "text/plain" })
        res.write("No Route Found")
        return res.end()
    }

    // res.end("welcome")
})

server.listen(4000, () => {
    console.log("server running on http://localhost:4000");
})