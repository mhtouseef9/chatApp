// const Post = require('../models/post')
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('../utils/chat-socket');

exports.createRoom = (req, res) => {
    console.log("in createRoom----")
    //Get username and roomname from form and pass it to room
    roomName = req.body.roomName;
    userName = req.body.userName;

    io.on('connection', () =>{
        console.log(req.body.userName + ' is connected to ' + req.body.roomName)
    })
    console.log(io.emit('message', req.body));
    res.send(req.body);
    // res.redirect(`/room?username=${username}&roomname=${roomname}`)
}

