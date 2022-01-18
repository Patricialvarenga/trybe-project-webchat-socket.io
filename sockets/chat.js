const moment = require('moment');

// O io foi uma criação do meu servidor, qd houver uma conexão, será criado o socket, onde será possível verificar os demais eventos
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('message', ({ chatMessage, nickname }) => {
            const date = new Date();
            const formatDate = moment(date).format('DD-MM-yyyy HH:MM:SS A');
            io.emit('message', `${formatDate} - ${nickname}: ${chatMessage}`);
        });
  });
};