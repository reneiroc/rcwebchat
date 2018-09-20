
 const socket = io();
 
 const $messageForm = $('#message-form');
 
 const $message = $('#message');
 const $chat = $('#chat');
//Dom 
 const $nickname = $('#nickName');
 const $nickError = $('#nickError');
 const $nickForm = $('#nickUserform');


 const $usersname = $('#usersName')

 $nickForm.submit(e =>{
     e.preventDefault();
    socket.emit('new user', $nickname.val());
     
 })

 $messageForm.submit( e => {
    e.preventDefault();
    //Enviar mensaje
    socket.emit('send-message', $message.val());
    $message.val('');
 })

// $messageForm.actions = function (){ alert("Ejecutado")};


 socket.on('new message', e =>{
     $chat.append (e + '<br/>');
 })

 socket.on('new user', e => {
    $usersname.append(e + '<br/>');

 });