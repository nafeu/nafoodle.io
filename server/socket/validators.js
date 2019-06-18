const {
  generateUID,
  clientIsInARoom,
  roomNotExists,
  usernameInUse,
} = require('../utils/helpers');

const MIN_USERNAME_LENGTH = 4;

module.exports = {
  validateJoinRoom: ({ roomId, store, username, socket }) => {
    if (!roomId) {
      return 'Please enter a room.';
    }

    if (roomNotExists(store, roomId)) {
      return 'Room does not exist.';
    }

    if (!username || username.length < 4) {
      return 'Please enter a valid username (at least 4 characters long).';
    }

    if (usernameInUse(store, roomId, username)) {
      return 'Username is already in use.';
    }

    if (clientIsInARoom(store, socket.id)) {
      return 'User already in a room.';
    }
  },

  validateCreateRoom: ({ username, store, socket }) => {
    if (!username || username.length < MIN_USERNAME_LENGTH) {
      return `Please enter a valid username (at least ${MIN_USERNAME_LENGTH} characters long).`;
    }

    if (clientIsInARoom(store, socket.id)) {
      return 'User already in a room.';
    }
  },
}
