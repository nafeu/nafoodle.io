export const MIN_PLAYERS_PER_MATCH = 1;
export const MAX_PLAYERS_PER_MATCH = 4;

export const DEFAULT_GAME_STATE = {
  count: 1
}

export const roomStatus = {
  WAITING_FOR_PLAYERS: 'WAITING',
  READY: 'READY',
  IN_GAME: 'IN_GAME',
}

export const getRoomStatus = (room) => {
  if (room.status === roomStatus.WAITING_FOR_PLAYERS) {
    if (room.users.length >= MIN_PLAYERS_PER_MATCH
        && room.users.length <= MAX_PLAYERS_PER_MATCH) {
      return roomStatus.READY;
    }
  }
  if (room.status === roomStatus.READY) {
    if (room.users.length < MIN_PLAYERS_PER_MATCH) {
      return roomStatus.WAITING_FOR_PLAYERS;
    }
  }
  return room.status;
}

export const getNewGameState = (state, input) => {
  const newState = { ...state }

  const { count } = input;

  newState.count = newState.count + 1;

  return newState;
}