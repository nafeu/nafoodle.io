export const addClient = (id) => {
  return {
    type: 'ADD_CLIENT',
    id,
  };
}

export const removeClient = (id) => {
  return {
    type: 'REMOVE_CLIENT',
    id,
  };
}

export const createRoom = (username, roomId, clientId) => {
  return {
    type: 'CREATE_ROOM',
    username,
    roomId,
    clientId,
  };
}

export const joinRoom = (username, roomId, clientId) => {
  return {
    type: 'JOIN_ROOM',
    username,
    roomId,
    clientId,
  };
}

export const leaveRoom = (id) => {
  return {
    type: 'LEAVE_ROOM',
    id,
  }
}

export const startGame = (username, roomId, clientId) => {
  return {
    type: 'START_GAME',
    username,
    roomId,
    clientId,
  };
}

export const processPlayerInput = (roomId, input) => {
  return {
    type: 'PLAYER_INPUT',
    roomId,
    input,
  };
}