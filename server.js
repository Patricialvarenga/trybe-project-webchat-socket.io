const express = require('express');

const app = express();

const http = require('http').createServer(app);
// const cors = require('cors'); // back libera permissão para o front

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000', // url aceita pelo cors
      methods: ['GET'], // Método aceito pela url
    } });

    // app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(`${__dirname}/views`));

app.get('/', require('./controller/user'));
require('./sockets/client')(io);
require('./sockets/chat')(io);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});