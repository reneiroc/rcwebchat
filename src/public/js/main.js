
 const socket = io();
 
 const $messageForm = $('#message-form');
 
 const $message = $('#message');
 const $chat = $('#chat');
 const $nickname = $('#nickName');
 const $nickError = $('#nickError');
 const $nickForm = $('#nickUserform');

 const $usersname = $('#usersNameList')

 $nickForm.submit(e =>{
     //Valido el formulario
    var form = document.querySelector('.needs-validation');
    if (form.checkValidity() === false){
        event.preventDefault();
        event.stopPropagation();
    }else{
        e.preventDefault();
        //enviar usuario
       socket.emit('new user', $nickname.val(), data =>{
           if (data){
               //MOstrar cuadro de mensajes y cuadro de Usuaiors
               $('#chatWrap').show(); 
               $('#userloginbox').hide()
           }else{
               //mostrar error
               // Error no sale reivsar problema
               $nickError.html(`
                   <div class = "alert alert-warning">
                   Usuario ya existe
                   </div>
               `)
           }    
           $nickname.val('');
           console.log(data);
       } );
    }
    //Agrego la clase al form para notificar validacion
    form.classList.add('was-validated');
    

 })

 $messageForm.submit( e => {
    e.preventDefault();
    //Enviar mensaje
    socket.emit('send-message', $message.val());
    $message.val('');
 })

// $messageForm.actions = function (){ alert("Ejecutado")};


 socket.on('new message', e =>{
     $chat.append ( '<b>' + e.nick + '</b>: ' + e.msg + '<br>');
 })

 socket.on('newusers', data => {
     let html= ''
    console.log(data);
    for (let i=0; i < data.length; i++){

        html += `<p><i class="fas fa-user"></i> ${data[i]} </p>`
    }
    
    $usersname.html(html);


 });