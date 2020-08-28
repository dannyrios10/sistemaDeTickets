const { io } = require('../server');

const { TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();



//SOCKETS DEL LADO DEL SERVIDOR


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();


        console.log(siguiente);
        callback(siguiente);
       
    });

    // emitir un evento  llamado estadoActual

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) =>{
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es obligatorio'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // Actuallizar 0 notificar cambios en los ultumos 4

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

        
    });


});