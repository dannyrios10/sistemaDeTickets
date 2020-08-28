//SOCKETS DE LADO DEL FRONTEND


var socket = io();

let label = $('small');

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function(){
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){

        if(resp === 'No Hay Tickets'){
            alert(resp);
            $('h1').text(resp);
            $('h4').text('');
            label.text('');
            return;
        }
    
        label.text('Ticket ' + resp.numero);

    })
});