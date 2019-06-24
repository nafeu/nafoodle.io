const addClient = (id) => {
  return {
    type: 'ADD_CLIENT',
    id,
  };
}

const removeClient = (id) => {
  return {
    type: 'REMOVE_CLIENT',
    id,
  };
}

const createRoom = (username, roomId, clientId) => {
  return {
    type: 'CREATE_ROOM',
    username,
    roomId,
    clientId,
  };
}

const joinRoom = (username, roomId, clientId) => {
  return {
    type: 'JOIN_ROOM',
    username,
    roomId,
    clientId,
  };
}

const leaveRoom = (id) => {
  return {
    type: 'LEAVE_ROOM',
    id,
  }
}

module.exports = {
  addClient,
  removeClient,
  createRoom,
  joinRoom,
  leaveRoom,
};
