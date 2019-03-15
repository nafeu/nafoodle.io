const _ = require('lodash');

const {
  addClient,
  removeClient,
  createRoom,
} = require('./actions');

function clientIsInARoom(store, clientId) {
  const state = store.getState();
  return _.find(state.rooms, (room) => {
    return _.includes(room.users.map(u => u.id), clientId);
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

      socket.on('CREATE_ROOM', ({ username }) => {
        if (username.length === 0) {
          socket.emit('INVALID_REQUEST', { message: 'User must enter a name.' });
        } else if (clientIsInARoom(store, socket.id)) {
          socket.emit('INVALID_REQUEST', { message: 'User already in a room.' });
        } else {
          store.dispatch(createRoom(username, socket.id));
        }
        io.emit('DEBUG_STATE', store.getState());
      });
    });

    return io;
  },
};
