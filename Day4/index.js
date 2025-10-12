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
        res.write("Welcome to the DashBoard")
        return res.end()
    } else if (pathName === "/users") {
        if (req.method === "GET") {
            let users = readFile()
            // console.log(users);
            if (req.method === "GET" && query.id) {
                const filteredData = users.filter(x => x.id === Number(query.id))
                res.writeHead(200, { "content-type": "application/json" })
                res.write(JSON.stringify(filteredData))
                return res.end()
            }
            if (req.method === "GET" && query.age) {
                const filteredData = users.filter(x => x.age === Number(query.age))
                res.writeHead(200, { "content-type": "application/json" })
                res.write(JSON.stringify(filteredData))
                return res.end()
            }
            res.writeHead(200, { "content-type": "application/json" })
            res.write(JSON.stringify(users))
            return res.end()
        } else if (req.method == "DELETE") {
            let users = readFile()
            const dataLength = users.length
            const filteredData = users.filter(x => x.id !== Number(query.id))
            if (filteredData.length < dataLength) {
                writeFile(filteredData)
                return res.end("Item deleted sucessfully")
            } else {
                return res.end("No item found to delete")
            }
        } else if (req.method === "POST") {
            let body = ""
            req.on("data", (chunks) => {
                body += chunks
            })
            req.on("end", () => {
                let newUsers = JSON.parse(body)
                let users = readFile()
                users = [...users, newUsers]
                newUsers.id = users.length
                writeFile(users)
                return res.end("Added user")
            })
        } else if (req.method === "PUT") {
            let body = ""
            req.on("data", (chunks) => {
                body += chunks
            })
            req.on("end", () => {
                let editUser = JSON.parse(body)
                let users = readFile()
                const index = users.findIndex(x => x.id === Number(query.id))
                if (index == -1) {
                    res.writeHead(404, { "content-type": "text/plain" })
                    res.write("No data found with the id")
                    return res.end()
                }
                editUser.id = users[index].id
                users[index] = editUser
                writeFile(users)
                return res.end("Updated Done")
            })
        }
    } else {
        res.writeHead(404, { "content-type": "text/plain" })
        res.write("No data found")
        return res.end()
    }
})

server.listen(5000, () => {
    console.log("http://localhost:5000");
})