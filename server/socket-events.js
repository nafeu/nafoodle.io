const _ = require('lodash');

const {
  addClient,
  removeClient,
  createRoom,
  joinRoom,
} = require('./actions');

const {
  generateUID,
  clientIsInARoom,
  roomNotExists,
  usernameInUse,
} = require('./helpers');

module.exports = {
  use: (io, store) => {
    io.on('connection', (socket) => {
      store.dispatch(addClient(socket.id));
      io.emit('DEBUG_STATE', store.getState());

      socket.on('TEST_CONNECTION', (testConnectionCount) => {
        console.log(`TEST_CONNECTION ${testConnectionCount} from ${socket.id}`);
      })

      socket.on('disconnect', () => {
        store.dispatch(removeClient(socket.id));
        io.emit('DEBUG_STATE', store.getState());
      });

      socket.on('JOIN_ROOM', ({ username, roomId }) => {
        if (!roomId) {
          socket.emit('INVALID_REQUEST', { message: 'Please enter a room.' });
        } else if (roomNotExists(store, roomId)) {
          socket.emit('INVALID_REQUEST', { message: 'Room does not exist.' });
        } else if (!username || username.length < 4) {
          socket.emit('INVALID_REQUEST', { message: 'Please enter a valid username (at least 4 characters long).' });
        } else if (usernameInUse(store, roomId, username)) {
          socket.emit('INVALID_REQUEST', { message: 'Username is already in use.' });
        } else if (clientIsInARoom(store, socket.id)) {
          socket.emit('INVALID_REQUEST', { message: 'User already in a room.' });
        } else {
          socket.join(roomId);
          store.dispatch(joinRoom(username, roomId, socket.id));
          const state = store.getState();
          const joinedRoom = _.find(state.rooms, (room) => {
            return room.id === roomId;
          });
          socket.emit('JOIN_ROOM_SUCCESS', joinedRoom);
          socket.to(roomId).emit('UPDATE_ROOM', joinedRoom);
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
          const state = store.getState();
          const joinedRoom = _.find(state.rooms, (room) => {
            return room.id === roomId;
          });
          socket.emit('CREATE_ROOM_SUCCESS', joinedRoom);
        }
        io.emit('DEBUG_STATE', store.getState());
      });
    });

    return io;
  },
};
