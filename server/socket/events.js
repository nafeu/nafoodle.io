import _ from 'lodash';

import {
  addClient,
  removeClient,
  createRoom,
  joinRoom,
  leaveRoom,
} from '../store/actions';

import {
  generateUID,
  getRoomById,
  getRoomIdByClientId,
  updateRoom,
} from '../utils/helpers';

import {
  validateJoinRoom,
  validateCreateRoom,
} from './validators';

export const handleDisconnect = ({ socket, store }) => {
  return () => {
    const roomId = getRoomIdByClientId(store, socket.id);
    store.dispatch(removeClient(socket.id));
    updateRoom(store, socket, roomId);
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
      socket.emit('invalidRequest', { message });
    } else {
      socket.join(roomId);
      store.dispatch(joinRoom(username, roomId, socket.id));
      const joinedRoom = getRoomById(store, roomId);
      socket.emit('joinRoomSuccess', joinedRoom);
      socket.to(roomId).emit('updateRoom', joinedRoom);
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
      socket.emit('invalidRequest', { message });
    } else {
      const roomId = generateUID(_.map(store.getState().rooms, 'id'));
      socket.join(roomId);
      store.dispatch(createRoom(username, roomId, socket.id));
      const joinedRoom = getRoomById(store, roomId);
      socket.emit('createRoomSuccess', joinedRoom);
    }
  }
}

export const handleLeaveRoom = ({ socket, store }) => {
  return ({ roomId }) => {
    socket.leave(roomId);
    store.dispatch(leaveRoom(socket.id));
    updateRoom(store, socket, roomId);
  }
}