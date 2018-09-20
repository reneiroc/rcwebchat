var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var path = require('path');

const app = express();
const server = http.createServer(app);
//Archivos estaicos
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 2000);
const io = socketio.listen(server);
require('./sockets')(io);
//Servidor escuchando
server.listen(app.get('port'), function(){
  console.log('listening on *:' + app.get('port'));
});