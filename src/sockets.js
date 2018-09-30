
//Funcionalidad del Web Socket
module.exports = function(io){
    let nicknames = [];
     //Websocket escuchando
    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('send-message', data =>{
            //Eviamos mensaje y nombre de usuario
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            } )
            
        })

        socket.on('new user', (data, cb) =>{
            
            if (nicknames.indexOf(data) != -1 ) {
                cb(false);
                // console.log(false)
                

            }else {
                cb(true);
                // console.log(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);
                //emitir vento para envair a los sockets los usuaiors
                io.sockets.emit('newusers', nicknames);
                console.log(nicknames);
            }
        })

        socket.on('disconnect', data =>{

             nicknames.splice( nicknames.indexOf(socket.nickname), 1);
            //Actualizar usuarioss
             io.sockets.emit('newusers', nicknames);
        })

    });



}

