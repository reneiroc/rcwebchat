
//Funcionalidad del Web Socket
module.exports = function(io){
    let nicknames = [];
     //Websocket escuchando
    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('send-message', data =>{
            io.sockets.emit('new message', data)
            
        })

        socket.on('new user', (data, cb) =>{
            
            if (nicknames.indexOf(data) != -1 ) {
                cb(false);
                // console.log(false)
                

            }else {
                cb(true);
                // console.log(true);
                socket.nickname = data;
                nicknames.push(data);
                //emitir vento para envair a los sockets los usuaiors
                io.sockets.emit('newusers', nicknames);
            }


        

        })

    });


}

