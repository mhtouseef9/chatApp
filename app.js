const express = require("express");
const app = express();

// const config = require("./config/config");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// to access any file from this folder from URL like http://localhost:3000/uploads/abc.jpg
app.use('/uploads', express.static("uploads"));

//importing all routes here

const users = require("./routes/user.routes");
const rooms = require("./routes/room.routes");
const {getUsers} = require("./utils/getUsers");

app.get("/", (req, res) =>{
    res.render('index')
});
app.use("/users", users);
app.use("/room", rooms);

// app.set('view engine', 'ejs');

const server = app.listen(process.env.PORT || 3000, () => console.log('Server started'));
const io = require("socket.io")(server);
require('./utils/socket').socket(io);

// var http = require('http').Server(app)
// const io = socket(http);
// const io = socket(server);
//const socketIO = require('./utils/socket')(io);
// console.log(socketIO)


// importing all config
// config;
