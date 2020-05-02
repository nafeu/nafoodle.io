import _ from 'lodash';
import { combineReducers } from 'redux';

import { getGame } from '../games';

import rps from '../games/rps';

function rooms(state = [], action) {
  switch (action.type) {
    case 'CREATE_ROOM': {
      return [
        ...state,
        {
          id: action.roomId,
          status: 'WAITING',
          users: [
            {
              id: action.clientId,
              username: action.username,
              host: true,
            },
          ],
          game: 'rps',
          gameState: {}
        },
      ];
    }
    case 'JOIN_ROOM': {
      state.forEach((room) => {
        if (room.id === action.roomId) {
          room.users.push({
            id: action.clientId,
            username: action.username,
          });
          room.status = getGame(room.game).getRoomStatus(room);
        }
      });
      return state;
    }
    case 'LEAVE_ROOM': {
      state.forEach((room) => {
        if (_.includes(room.users.map(u => u.id), action.id)) {
          room.status = getGame(room.game).getRoomStatus(room);
        }
        _.remove(room.users, (user) => {
          return user.id === action.id;
        });
      });
      _.remove(state, (room) => {
        return room.users.length === 0;
      });
      return state;
    }
    case 'REMOVE_CLIENT':
      state.forEach((room) => {
        if (_.includes(room.users.map(u => u.id), action.id)) {
          room.status = getGame(room.game).getRoomStatus(room);
        }
        _.remove(room.users, (user) => {
          return user.id === action.id;
        });
      });
      _.remove(state, (room) => {
        return room.users.length === 0;
      });
      return state;
    case 'START_GAME':
      state.forEach((room) => {
        if (room.id === action.roomId) {
          room.status = 'IN_GAME';
          room.gameState = getGame(room.game).getDefaultGameState(room.users);
        }
      });
      return state;
    case 'PLAYER_INPUT':
      state.forEach((room) => {
        if (room.id === action.roomId) {
          room.gameState = getGame(room.game).getNextGameState(room.gameState, action.input);
        }
      });
      return state;
    default:
      return state;
  }
}

function clients(state = [], action) {
  switch (action.type) {
    case 'ADD_CLIENT':
      return _.union(state, [action.id]);
    case 'REMOVE_CLIENT':
      return _.pull(state, action.id);
    default:
      return state;
  }
}

export default combineReducers({
  rooms,
  clients,
});
