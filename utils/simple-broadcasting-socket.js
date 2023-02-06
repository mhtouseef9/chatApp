exports.socket = (io) => {
    //Socket connection
    console.log("in socket func------")
    io.on('connection', (socket) => {
        console.log("in connection------")
        socket.on('chat', (data) =>{
            // emitting for any event without any particular topic
            io.emit('chat', {userName: data.userName, message: data.message});
        });

        //Remove user from memory when they disconnect
        socket.on('disconnecting', ()=>{
            console.log("in disconnecting------");
        })
    })

}
