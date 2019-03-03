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
  createRoom: (username) => {
    return {
      type: 'CREATE_ROOM',
      username,
    };
  },
};
