import * as events from './events';

export default function connectRealtimeServices(connection) {
  const { socket } = connection;
  socket.on('disconnect', events.handleDisconnect(connection));
  socket.on('joinRoom', events.handleJoinRoom(connection));
  socket.on('createRoom', events.handleCreateRoom(connection));
  socket.on('leaveRoom', events.handleLeaveRoom(connection));
  socket.on('startGame', events.handleStartGame(connection));
  socket.on('playerInput', events.handlePlayerInput(connection));
}
