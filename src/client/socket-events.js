module.exports = {
  use: (socket) => {
    socket.on('connect', () => {
      console.log('Socket connection established');
    });

    socket.on('test', () => {
      console.log('Test message received');
    });

    return socket;
  },
};
