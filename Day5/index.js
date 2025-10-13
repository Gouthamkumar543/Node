const http = require("http")
const url = require("url")
const fs = require("fs")

function readFile() {
    const data = fs.readFileSync("data.json", "utf-8")
    return JSON.parse(data)
}

function writeFile(x) {
    fs.writeFileSync("data.json", JSON.stringify(x), "utf-8")
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathName = parsedUrl.pathname
    const query = parsedUrl.query

    if (pathName === "/") {
        res.writeHead(200, { "content-type": "text/plain" })
        return res.end("Welcome to the Users DashBoard")
    } else if (pathName === "/users") {
        if (req.method === "GET") {
            let users = readFile()
            res.writeHead(200, { "content-type": "application/json" })
            return res.end(JSON.stringify(users))
        } else if (req.method === "POST") {
            let body = ""
            req.on("data", (chunks) => {
                body += chunks
            })
            req.on("end", () => {
                let newUser = JSON.parse(body)
                let users = readFile()
                newUser.id = users.length + 1
                users = [...users, newUser]
                writeFile(users)
                return res.end("User Added Sucessfully")
            })
        } else if (req.method === "DELETE") {
            if (query.id) {
                let users = readFile()
                const originalLength = users.length
                const filteredData = users.filter(x => x.id !== Number(query.id))

                if (filteredData.length < originalLength) {
                    writeFile(filteredData)
                    return res.end("Deleted sucessfully")
                }

                return res.end("No item found with the id")
            }
        } else if (req.method === "PUT") {
            let body = ""
            req.on("data", (chunks) => {
                body += chunks
            })
            req.on("end", () => {
                let editUser = JSON.parse(body)
                let users = readFile()
                const index = users.findIndex(x => x.id === Number(query.id))
                editUser.id = users[index].id
                users[index] = editUser

                if (index === -1) {
                    return res.end("Cant find the Id")
                }

                writeFile(users)
                return res.end("Updated sucessfully")
            })
        }
    } else {
        res.writeHead(200, { "content-type": "text/plain" })
        return res.end("No data found")
    }
})

server.listen(8000, () => {
    console.log("http://localhost:8000");
})