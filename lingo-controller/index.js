const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) =>{
    console.log(`Connection from: ${socket.id}`)
    socket.on("number_change", (data) => {
        console.log(`New number: ${data["number"]}`)
        socket.broadcast.emit("number_change", data)
    })
    socket.on("toggle_number", () => {
        console.log("Toggling number")
        socket.broadcast.emit("toggle_number")
    })
})

server.listen(4096, () => {
    console.log("We're on!")
})

