import {
  generateUID,
  clientIsInARoom,
  roomNotExists,
  usernameInUse,
  roomHasPlayers,
  roomHasMaxPlayers,
  roomHasMinPlayers,
  roomInGame,
  clientIsHostOfRoom,
  getLobbyInfo
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

  if (roomHasMaxPlayers(store, roomId)) {
    return 'Room is full.';
  }

  if (roomInGame(store, roomId)) {
    return 'Game in progress.';
  }
}

export const validateCreateRoom = ({ username, store, socket }) => {
  if (!username) {
    return 'Please enter a username.';
  }

  if (username.length < MIN_USERNAME_LENGTH) {
    return `Please enter a valid username (at least ${MIN_USERNAME_LENGTH} characters long).`;
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    return `Username is too long (max ${MAX_USERNAME_LENGTH} characters long).`;
  }

  if (clientIsInARoom(store, socket.id)) {
    return 'User already in a room.';
  }
}

export const validateStartGame = ({ username, roomId, store, socket }) => {
  const { minPlayersPerRoom } = getLobbyInfo(store, roomId);

  console.log({ lobby: getLobbyInfo(store, roomId), minPlayersPerRoom });

  if (!roomHasMinPlayers(store, roomId)) {
    return `Need at least ${minPlayersPerRoom} players to start game.`
  }

  if (!clientIsHostOfRoom(store, roomId, socket.id)) {
    return 'Only the host may start the game.';
  }
}