const _ = require('lodash');
const { combineReducers } = require('redux');
const { generateUID } = require('./helpers');

function rooms(state = [], action) {
  switch (action.type) {
    case 'CREATE_ROOM':
      return [
        ...state,
        {
          id: generateUID(),
          users: [
            { name: action.username },
          ],
        },
      ];
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

const reducers = combineReducers({
  rooms,
  clients,
});

module.exports = reducers;
