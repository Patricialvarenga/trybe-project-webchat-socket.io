const onlineUsers = [];

// O io foi uma criação do meu servidor, qd houver uma conexão, será criado o socket, onde será possível verificar os demais eventos
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('create', (nickname) => {
     onlineUsers.push({ id: socket.id, nickname });
    io.emit('onlineUsers', onlineUsers);
  });

  socket.on('updateNickname', (nickname) => {
    const user = onlineUsers.find(({ id }) => id === socket.id);
    user.nickname = nickname;
    io.emit('onlineUsers', onlineUsers);
  });

  socket.on('disconnect', () => {
    const index = onlineUsers.findIndex(({ id }) => id === socket.id);
    onlineUsers.splice(index, index + 1);
    io.emit('onlineUsers', onlineUsers);
  });
});