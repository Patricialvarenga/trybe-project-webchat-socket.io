const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors'); // back libera permissão para o front

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000', // url aceita pelo cors
      methods: ['GET', 'POST'], // Métodos aceitos pela url
    } });

    app.use(cors());

require('./sockets/chat')(io);

// renderiza o html      
/* app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
}); */

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});