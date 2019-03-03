const {
  addClient,
  removeClient,
} = require('./actions');

module.exports = {
  use: (io, store) => {
    io.on('connection', (socket) => {
      store.dispatch(addClient(socket.id));
      io.emit('currentState', store.getState());

      socket.on('disconnect', () => {
        store.dispatch(removeClient(socket.id));
        io.emit('currentState', store.getState());
      });
    });

    return io;
  },
};
