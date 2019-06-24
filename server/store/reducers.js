import _ from 'lodash';
import { combineReducers } from 'redux';

function rooms(state = [], action) {
  switch (action.type) {
    case 'CREATE_ROOM': {
      return [
        ...state,
        {
          id: action.roomId,
          status: 'IN-GAME',
          users: [
            {
              id: action.clientId,
              username: action.username,
              host: true,
            },
          ],
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
        }
      });
      return state;
    }
    case 'LEAVE_ROOM': {
      state.forEach((room) => {
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
        _.remove(room.users, (user) => {
          return user.id === action.id;
        });
      });
      _.remove(state, (room) => {
        return room.users.length === 0;
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
