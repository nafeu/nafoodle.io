const _ = require('lodash');

const {
  addClient,
  removeClient,
  createRoom,
  joinRoom,
} = require('./actions');

const {
  generateUID,
} = require('../helpers');

function clientIsInARoom(store, clientId) {
  const state = store.getState();
  return _.find(state.rooms, (room) => {
    return _.includes(room.users.map(u => u.id), clientId);
  });
}

function roomNotExists(store, roomId) {
  const state = store.getState();
  return !state.rooms.some(room => room.id === roomId);
}

function usernameInUse(store, roomId, username) {
  const state = store.getState();
  const roomToCheck = _.find(state.rooms, (room) => {
    return room.id === roomId;
  });
  return _.find(roomToCheck.users, (user) => {
    return user.username === username;
  });
}

module.exports = {
  use: (io, store) => {
    io.on('connection', (socket) => {
      store.dispatch(addClient(socket.id));
      io.emit('DEBUG_STATE', store.getState());

      socket.on('disconnect', () => {
        store.dispatch(removeClient(socket.id));
        io.emit('DEBUG_STATE', store.getState());
      });

      socket.on('JOIN_ROOM', ({ username, roomId }) => {
        if (!username || username.length < 4) {
          socket.emit('INVALID_REQUEST', { message: 'Please enter a valid username (at least 4 characters long).' });
        } else if (!roomId) {
          socket.emit('INVALID_REQUEST', { message: 'Please enter a room.' });
        } else if (roomNotExists(store, roomId)) {
          socket.emit('INVALID_REQUEST', { message: 'Room does not exist.' });
        } else if (usernameInUse(store, roomId, username)) {
          socket.emit('INVALID_REQUEST', { message: 'Username is already in use.' });
        } else if (clientIsInARoom(store, socket.id)) {
          socket.emit('INVALID_REQUEST', { message: 'User already in a room.' });
        } else {
          socket.join(roomId);
          store.dispatch(joinRoom(username, roomId, socket.id));
          socket.emit('JOIN_ROOM_SUCCESS', { username, roomId });
        }
        io.emit('DEBUG_STATE', store.getState());
      });

      socket.on('CREATE_ROOM', ({ username }) => {
        if (!username || username.length < 4) {
          socket.emit('INVALID_REQUEST', { message: 'Please enter a valid username (at least 4 characters long).' });
        } else if (clientIsInARoom(store, socket.id)) {
          socket.emit('INVALID_REQUEST', { message: 'User already in a room.' });
        } else {
          const roomId = generateUID(_.map(store.getState().rooms, 'id'));
          socket.join(roomId);
          store.dispatch(createRoom(username, roomId, socket.id));
          socket.emit('CREATE_ROOM_SUCCESS', { username, roomId });
        }
        io.emit('DEBUG_STATE', store.getState());
      });
    });

    return io;
  },
};
