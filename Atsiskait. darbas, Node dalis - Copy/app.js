const mongoose = require("mongoose")
const express = require("express")
const session = require("express-session")
const cors = require("cors")
const app = express()
const mainRouter = require("./router/mainRouter")


const http = require("http").createServer(app)
const socket = require("socket.io")
require("dotenv").config()

const io = socket(http, {cors: { origin: "http://localhost:3000"}})



mongoose.connect(process.env.MONGO_KEY).then(res => {
    console.log("CONNECTED")
}).catch(e => {
    console.log('ERROR')
})

http.listen(4000)
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
    methods: "GET, POST"
}))
app.use(session({
    secret: "6564898s84f4s45",
    resave: false,
    saveUninitialized: true
}))

app.use('/', mainRouter)



const users = []

io.on("connect", (socket) => {
    console.log("Saulius");
    socket.on("login", user => {
        console.log(user);
        // const newUser = {
        //     user,
        //     id: socket.id, 
                       
        // }
        users.push(user)
        console.log(user);

        const currentUser = users.find(x => x.id === socket.id)
        // io.to(currentUser.id).emit("users", users)

        socket.emit("profile", users)
    })




    // socket.on("reserve", data => {
    //     const {seatIndex, index, newOcupiedSeats} = data
        
    //     movies[index].seats[seatIndex].reserved = true        
    //     movies[index].ocupiedSeats = newOcupiedSeats

    //     socket.emit("movies", movies)
    // })

})

