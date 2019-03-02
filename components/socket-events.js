module.exports = {
  use: (io) => {
    io.on('connection', (socket) => {
      console.log(`[ socket-events.js ] ${socket.id} connected...`);
      socket.on('disconnect', () => {
        console.log(`[ socket-events.js ] ${socket.id} disconnected...`);
      });
    });

    return io;
  },
};
