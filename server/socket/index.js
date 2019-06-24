const handlers = require('./handlers');

module.exports.use = (connection) => {
  const { socket } = connection;
  socket.on('disconnect', handlers.handleDisconnect(connection));
  socket.on('joinRoom', handlers.handleJoinRoom(connection));
  socket.on('createRoom', handlers.handleCreateRoom(connection));
  socket.on('leaveRoom', handlers.handleLeaveRoom(connection));
}
