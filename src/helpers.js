const _ = require('lodash');

module.exports = {
  generateUID: (ids) => {
    const uid = (`0000${(Math.random() * (36 ** 4) << 0).toString(36)}`).slice(-4);
    if (_.includes(ids, uid)) {
      return this.generateUID(ids);
    }
    return uid;
  },
  logger: ({ getState }) => {
    return next => (action) => {
      console.log('--- DISPATCH ---');
      console.log(JSON.stringify(action, null, 2));
      const returnValue = next(action);
      console.log('--- UPDATED STATE ---');
      console.log(JSON.stringify(getState(), null, 2));
      return returnValue;
    };
  },
  fieldsNotEmpty: (fields) => {
    let output = true;
    fields.forEach((field) => {
      if (field.value === '') {
        output = false;
      }
    });
    return output;
  },
  clientIsInARoom(store, clientId) {
    const state = store.getState();
    return _.find(state.rooms, (room) => {
      return _.includes(room.users.map(u => u.id), clientId);
    });
  },
  roomNotExists(store, roomId) {
    const state = store.getState();
    return !state.rooms.some(room => room.id === roomId);
  },
  usernameInUse(store, roomId, username) {
    const state = store.getState();
    const roomToCheck = _.find(state.rooms, (room) => {
      return room.id === roomId;
    });
    return _.find(roomToCheck.users, (user) => {
      return user.username === username;
    });
  },
};
