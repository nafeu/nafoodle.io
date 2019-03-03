const {
  addClient,
  removeClient,
} = require('./actions');

module.exports = {
  use: (io, store) => {
    io.on('connection', (socket) => {
      store.dispatch(addClient(socket.id));

      socket.on('disconnect', () => {
        store.dispatch(removeClient(socket.id));
      });
    });

    return io;
  },
};
