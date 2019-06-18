module.exports = {
  addClient: (id) => {
    return {
      type: 'ADD_CLIENT',
      id,
    };
  },
  removeClient: (id) => {
    return {
      type: 'REMOVE_CLIENT',
      id,
    };
  },
  createRoom: (username, roomId, clientId) => {
    return {
      type: 'CREATE_ROOM',
      username,
      roomId,
      clientId,
    };
  },
  joinRoom: (username, roomId, clientId) => {
    return {
      type: 'JOIN_ROOM',
      username,
      roomId,
      clientId,
    };
  },
};
