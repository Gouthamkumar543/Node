const http = require("http")
const url = require("url")

let data = [{
    id: 1,
    title: "phone",
    color: "black"
},
{
    id: 2,
    title: "phone",
    color: "sliver"
}, {
    id: 3,
    title: "tv",
    color: "black"
}, {
    id: 4,
    title: "sofa",
    color: "brown"
}, {
    id: 5,
    title: "phone",
    color: "sliver"
}, {
    id: 6,
    title: "tv",
    color: "grey"
}]

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const query = parsedUrl.query
    const pathName = parsedUrl.pathname

    if (pathName == "/") {
        res.writeHead(200, { "content-type": "text/plain" })
        res.write("Welcome to the online products")
        return res.end()
    } else if (pathName === "/products") {
        if (req.method === "GET") {
            res.writeHead(200, { "content-type": "application/json" })
            res.write(JSON.stringify(data))
            return res.end()
        }

        if (req.method === "GET" && query.id) {
            const filterItem = data.filter(x => x.id === Number(query.id))
            if (filterItem.length > 0) {
                res.writeHead(200, { "content-type": "application/json" })
                res.write(JSON.stringify(filterItem))
                return res.end()
            } else {
                res.writeHead(404, { "content-type": "text/plain" })
                res.write("No item found with the id")
                return res.end()
            }
        }

        if (req.method === "GET" && query.category) {
            const filterItem = data.filter(x => x.category === query.category)
            if (filterItem.length > 0) {
                res.writeHead(200, { "content-type": "application/json" })
                res.write(JSON.stringify(filterItem))
                return res.end()
            } else {
                res.writeHead(404, { "content-type": "text/plain" })
                res.write("No item found with the category")
                return res.end()
            }
        }

        if (req.method === "DELETE") {
            if (query.id) {
                const originalLength = data.length
                const updatedData = data.filter((x) => x.id !== Number(query.id))
                // console.log(updatedData);

                if (updatedData.length < originalLength) {
                    res.writeHead(200, { "content-type": "application/json" })
                    res.write(JSON.stringify({ message: "Item Deleted Sucessfully", updatedData }))
                    return res.end()
                } else {
                    res.writeHead(404, { "content-type": "text/plain" })
                    res.write("No item found to delete")
                    return res.end()
                }
            }
        }

        if (req.method === "POST") {
            let body = ""
            req.on("data", (chuncks) => {
                body += chuncks
                // console.log(body);
            })

            req.on("end", () => {
                let postData = JSON.parse(body)
                res.writeHead(201, { "content-type": "application/json" })
                res.write(JSON.stringify({ message: "data added sucessfully", postData }))
                return res.end()
            })
        }

        if (req.method === "PUT") {
            let body = ""
            req.on("data", (chuncks) => {
                body += chuncks
            })

            req.on("end", () => {
                let putData = JSON.parse(body)
                res.writeHead(201, { "content-type": "application/json" })
                res.write(JSON.stringify({ message: "data updated sucessfully", putData }))
                return res.end()
            })
        }
    }
    else {
        res.writeHead(200, { "content-type": "text/plain" })
        res.write("No data Found")
        return res.end()
    }
})

server.listen(5000, () => {
    console.log("http://localhost:5000");
})