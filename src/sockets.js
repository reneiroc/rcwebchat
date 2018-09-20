

module.exports = function(io){

     //Websocket escuchando
    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('send-message', data =>{
            io.sockets.emit('new message', data)
            
        })

        socket.on('new user', data =>{
            io.sockets.emit('new user', data);
            console.log(data);
        })

    });


}

