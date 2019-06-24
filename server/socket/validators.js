import {
  generateUID,
  clientIsInARoom,
  roomNotExists,
  usernameInUse,
} from '../utils/helpers';

const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 15;

export const validateJoinRoom = ({ roomId, store, username, socket }) => {
  if (!roomId) {
    return 'Please enter a room.';
  }

  if (roomNotExists(store, roomId)) {
    return 'Room does not exist.';
  }

  if (!username) {
    return 'Please enter a username.';
  }

  if (username.length < MIN_USERNAME_LENGTH) {
    return 'Please enter a valid username (at least 4 characters long).';
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    return 'Username is too long (max 15 characters long).';
  }

  if (usernameInUse(store, roomId, username)) {
    return 'Username is already in use.';
  }

  if (clientIsInARoom(store, socket.id)) {
    return 'User already in a room.';
  }
}

export const validateCreateRoom = ({ username, store, socket }) => {
  if (!username) {
    return 'Please enter a username.';
  }

  if (username.length < MIN_USERNAME_LENGTH) {
    return 'Please enter a valid username (at least 4 characters long).';
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    return 'Username is too long (max 15 characters long).';
  }

  if (clientIsInARoom(store, socket.id)) {
    return 'User already in a room.';
  }
}