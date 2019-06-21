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
} = require('../utils/helpers');

const {
  validateJoinRoom,
  validateCreateRoom,
} = require('./validators');

module.exports = {
  use: (io, store) => {
    io.on('connection', (socket) => {
      store.dispatch(addClient(socket.id));

      socket.on('disconnect', () => {
        const roomId = getRoomIdByClientId(store, socket.id);
        store.dispatch(removeClient(socket.id));
        const updatedRoom = getRoomById(store, roomId);
        if (updatedRoom) {
          socket.to(roomId).emit('updateRoom', updatedRoom);
        }
      });

      socket.on('joinRoom', ({ username, roomId }) => {
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
          const state = store.getState();
          const joinedRoom = _.find(state.rooms, (room) => {
            return room.id === roomId;
          });
          socket.emit('joinRoomSuccess', joinedRoom);
          socket.to(roomId).emit('updateRoom', joinedRoom);
        }
      });

      socket.on('createRoom', ({ username }) => {
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
          const state = store.getState();
          const joinedRoom = _.find(state.rooms, (room) => {
            return room.id === roomId;
          });
          socket.emit('createRoomSuccess', joinedRoom);
        }
      });

      socket.on('leaveRoom', (roomId) => {
        store.dispatch(leaveRoom(socket.id));
        const state = store.getState();
        const updatedRoom = getRoomById(store, roomId);
        if (updatedRoom) {
          socket.to(roomId).emit('updateRoom', updatedRoom);
        }
      });
    });

    return io;
  },
};
