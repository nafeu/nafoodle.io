export const emitUpdateRoom = ({ socket, roomId, updatedRoom }) => {
  socket.to(roomId).emit('updateRoom', updatedRoom);
}

export const emitInvalidRequest = ({ socket, message }) => {
  socket.emit('invalidRequest', { message });
}

export const emitJoinRoomSuccess = ({ socket, roomId, joinedRoom }) => {
  socket.emit('joinRoomSuccess', joinedRoom);
  socket.to(roomId).emit('updateRoom', joinedRoom);
}

export const emitCreateRoomSuccess = ({ socket, createdRoom }) => {
  socket.emit('createRoomSuccess', createdRoom);
}