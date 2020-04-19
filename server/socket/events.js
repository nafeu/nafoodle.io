import _ from 'lodash';

import {
  addClient,
  removeClient,
  createRoom,
  joinRoom,
  leaveRoom,
  startGame
} from '../store/actions';

import {
  generateUID,
  getRoomById,
  getRoomIdByClientId,
} from '../utils/helpers';

import {
  validateJoinRoom,
  validateCreateRoom,
  validateStartGame
} from './validators';

import {
  emitUpdateRoom,
  emitInvalidRequest,
  emitJoinRoomSuccess,
  emitCreateRoomSuccess,
  emitStartGameSuccess
} from './emits';

export const handleDisconnect = ({ socket, store }) => {
  return () => {
    const roomId = getRoomIdByClientId(store, socket.id);
    store.dispatch(removeClient(socket.id));
    const updatedRoom = getRoomById(store, roomId);
    if (updatedRoom) {
      emitUpdateRoom({ socket, roomId, updatedRoom });
    }
  }
}

export const handleJoinRoom = ({ socket, store }) => {
  return ({ username, roomId }) => {
    const message = validateJoinRoom({
      roomId,
      store,
      username,
      socket
    });

    if (message) {
      emitInvalidRequest({ socket, message });
    } else {
      socket.join(roomId);
      store.dispatch(joinRoom(username, roomId, socket.id));
      const joinedRoom = getRoomById(store, roomId);
      emitJoinRoomSuccess({ socket, roomId, joinedRoom });
    }
  }
}

export const handleCreateRoom = ({ socket, store }) => {
  return ({ username }) => {
    const message = validateCreateRoom({
      username,
      store,
      socket
    });

    if (message) {
      emitInvalidRequest({ socket, message });
    } else {
      const roomId = generateUID(_.map(store.getState().rooms, 'id'));
      socket.join(roomId);
      store.dispatch(createRoom(username, roomId, socket.id));
      const createdRoom = getRoomById(store, roomId);
      emitCreateRoomSuccess({ socket, createdRoom });
    }
  }
}

export const handleStartGame = ({ socket, store }) => {
  return ({ username, roomId }) => {
    const message = validateStartGame({
      username,
      roomId,
      store,
      socket
    });

    if (message) {
      emitInvalidRequest({ socket, message });
    } else {
      store.dispatch(startGame(username, roomId, socket.id));
      const startedGameRoom = getRoomById(store, roomId);
      emitStartGameSuccess({ socket, roomId, startedGameRoom });
    }
  }
}

export const handleLeaveRoom = ({ socket, store }) => {
  return ({ roomId }) => {
    socket.leave(roomId);
    store.dispatch(leaveRoom(socket.id));
    const updatedRoom = getRoomById(store, roomId);
    if (updatedRoom) {
      emitUpdateRoom({ socket, roomId, updatedRoom });
    }
  }
}