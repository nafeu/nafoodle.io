export const MIN_PLAYERS_PER_MATCH = 2;
export const MAX_PLAYERS_PER_MATCH = 2;

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