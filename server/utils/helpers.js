import _ from 'lodash';
import { getGame } from '../games';

export const generateUID = (ids) => {
  const uid = (`0000${(Math.random() * (36 ** 4) << 0).toString(36)}`).slice(-4);
  if (_.includes(ids, uid)) {
    return generateUID(ids);
  }
  return uid;
}

export const clientIsInARoom = (store, clientId) => {
  const state = store.getState();
  return _.find(state.rooms, (room) => {
    return _.includes(room.users.map(u => u.id), clientId);
  });
}

export const clientIsHostOfRoom = (store, roomId, clientId) => {
  const state = store.getState();

  let output = false;
  const roomToCheck = _.find(state.rooms, (room) => {
    return room.id === roomId;
  });

  roomToCheck.users.forEach((user) => {
    if (user.id === clientId && user.host) {
      output = true;
    }
  });

  return output;
}

export const roomNotExists = (store, roomId) => {
  const state = store.getState();
  return !state.rooms.some(room => room.id === roomId);
}

export const usernameInUse = (store, roomId, username) => {
  const state = store.getState();
  const roomToCheck = _.find(state.rooms, (room) => {
    return room.id === roomId;
  });
  return _.find(roomToCheck.users, (user) => {
    return user.username === username;
  });
}

export const isHost = (clientId, userList) => {
  let output = false;
  userList.forEach((user) => {
    if (user.id === clientId && user.host) {
      output = true;
    }
  });
  return output;
}

export const getRoomById = (store, roomId) => {
  const state = store.getState();
  return _.find(state.rooms, (room) => {
    return room.id === roomId;
  });
}

export const getRoomIdByClientId = (store, clientId) => {
  const state = store.getState();
  const room = _.find(state.rooms, (room) => {
    return _.includes(room.users.map(u => u.id), clientId);
  });
  if (room) {
    return room.id;
  }
  return null;
}

export const hasNoHost = (room) => {
  return !_.includes(room.users.map(u => u.host), true);
}

export const roomHasPlayers = (store, roomId, count) => {
  const room = getRoomById(store, roomId);
  if (room) {
    if (count) {
      return room.users.length === count;
    }
    return room.users.length > 0;
  }
  return null;
}

export const roomHasMinPlayers = (store, roomId) => {
  const { playerCount, minPlayersPerRoom } = getLobbyInfo(store, roomId);
  return (playerCount >= minPlayersPerRoom);
}

export const roomHasMaxPlayers = (store, roomId) => {
  const { playerCount, maxPlayersPerRoom } = getLobbyInfo(store, roomId);
  return (playerCount === maxPlayersPerRoom);
}

export const roomInGame = (store, roomId) => {
  const room = getRoomById(store, roomId);
  if (room) {
    return room.status === 'IN_GAME';
  }
  return false;
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const getLobbyInfo = (store, roomId) => {
  const { users, game } = getRoomById(store, roomId);

  const {
    MIN_PLAYERS_PER_ROOM,
    MAX_PLAYERS_PER_ROOM
  } = getGame(game);

  return {
    playerCount: users.length,
    minPlayersPerRoom: MIN_PLAYERS_PER_ROOM,
    maxPlayersPerRoom: MAX_PLAYERS_PER_ROOM
  }
}