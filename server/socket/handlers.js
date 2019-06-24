const _ = require('lodash');

const {
  addClient,
  removeClient,
  createRoom,
  joinRoom,
  leaveRoom,
} = require('../store/actions');

const {
  generateUID,
  getRoomById,
  getRoomIdByClientId,
  updateRoom,
} = require('../utils/helpers');

const {
  validateJoinRoom,
  validateCreateRoom,
} = require('./validators');

module.exports.handleDisconnect = ({ socket, store }) => {
  return () => {
    const roomId = getRoomIdByClientId(store, socket.id);
    store.dispatch(removeClient(socket.id));
    updateRoom(store, socket, roomId);
  }
}

module.exports.handleJoinRoom = ({ socket, store }) => {
  return ({ username, roomId }) => {
    const message = validateJoinRoom({
      roomId,
      store,
      username,
      socket
    });

    if (message) {
      socket.emit('invalidRequest', { message });
    } else {
      socket.join(roomId);
      store.dispatch(joinRoom(username, roomId, socket.id));
      const joinedRoom = getRoomById(store, roomId);
      socket.emit('joinRoomSuccess', joinedRoom);
      socket.to(roomId).emit('updateRoom', joinedRoom);
    }
  }
}

module.exports.handleCreateRoom = ({ socket, store }) => {
  return ({ username }) => {
    const message = validateCreateRoom({
      username,
      store,
      socket
    });

    if (message) {
      socket.emit('invalidRequest', { message });
    } else {
      const roomId = generateUID(_.map(store.getState().rooms, 'id'));
      socket.join(roomId);
      store.dispatch(createRoom(username, roomId, socket.id));
      const joinedRoom = getRoomById(store, roomId);
      socket.emit('createRoomSuccess', joinedRoom);
    }
  }
}

module.exports.handleLeaveRoom = ({ socket, store }) => {
  return ({ roomId }) => {
    socket.leave(roomId);
    store.dispatch(leaveRoom(socket.id));
    updateRoom(store, socket, roomId);
  }
}