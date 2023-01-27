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
const constants = require("constants");

app.get("/", (req, res) =>{
    res.render('index')
});
app.use("/users", users);
app.use("/room", rooms);

// app.set('view engine', 'ejs');

const server = app.listen(process.env.PORT || 3000, () => console.log('Server started'));
const io = require("socket.io")(server);
// require('./utils/socket');

// var http = require('http').Server(app)
// const io = socket(http);
io.on('connection', (socket) =>{
    console.log('some user is connected....')
    socket.on('joined-user', (data) => {
        console.log(data)
        console.log("in joined users------")
        //Storing users connected in a room in memory
        var user = {};
        user[socket.id] = data.userName;
        console.log(user[socket.id])
        console.log(user)
        if (users[data.roomName]) {
            users[data.roomName].push(user);
        } else {
            users[data.roomName] = [user];
        }
        //Joining the Socket Room
        console.log(socket.join(data.roomName));

        //Emitting New Username to Clients
        console.log(io.to(data.roomName).emit('joined-user', {username: data.userName}));



        //Send online users array
        io.to(data.roomName).emit('online-users', getUsers(users[data.roomName]))
    })


})
// const io = socket(server);
//const socketIO = require('./utils/socket')(io);
// console.log(socketIO)


// importing all config
// config;
