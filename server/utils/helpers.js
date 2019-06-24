const _ = require('lodash');

const generateUID = (ids) => {
  const uid = (`0000${(Math.random() * (36 ** 4) << 0).toString(36)}`).slice(-4);
  if (_.includes(ids, uid)) {
    return generateUID(ids);
  }
  return uid;
}

const logger = ({ getState }) => {
  return next => (action) => {
    console.log('--- DISPATCH ---');
    console.log(JSON.stringify(action, null, 2));
    const returnValue = next(action);
    console.log('--- UPDATED STATE ---');
    console.log(JSON.stringify(getState(), null, 2));
    return returnValue;
  };
}

const fieldsNotEmpty = (fields) => {
  let output = true;
  fields.forEach((field) => {
    if (field.value === '') {
      output = false;
    }
  });
  return output;
}

const clientIsInARoom = (store, clientId) => {
  const state = store.getState();
  return _.find(state.rooms, (room) => {
    return _.includes(room.users.map(u => u.id), clientId);
  });
}

const roomNotExists = (store, roomId) => {
  const state = store.getState();
  return !state.rooms.some(room => room.id === roomId);
}

const usernameInUse = (store, roomId, username) => {
  const state = store.getState();
  const roomToCheck = _.find(state.rooms, (room) => {
    return room.id === roomId;
  });
  return _.find(roomToCheck.users, (user) => {
    return user.username === username;
  });
}

const isHost = (clientId, userList) => {
  let output = false;
  userList.forEach((user) => {
    if (user.id === clientId && user.host) {
      output = true;
    }
  });
  return output;
}

const getRoomById = (store, roomId) => {
  const state = store.getState();
  return _.find(state.rooms, (room) => {
    return room.id === roomId;
  });
}

const getRoomIdByClientId = (store, clientId) => {
  const state = store.getState();
  const room = _.find(state.rooms, (room) => {
    return _.includes(room.users.map(u => u.id), clientId);;
  });
  if (room) {
    return room.id;
  }
  return null;
}

const updateRoom = (store, socket, roomId) => {
  const updatedRoom = getRoomById(store, roomId);
  if (updatedRoom) {
    socket.to(roomId).emit('updateRoom', updatedRoom);
  }
}

module.exports = {
  generateUID,
  logger,
  fieldsNotEmpty,
  clientIsInARoom,
  roomNotExists,
  usernameInUse,
  isHost,
  getRoomById,
  getRoomIdByClientId,
  updateRoom,
};
