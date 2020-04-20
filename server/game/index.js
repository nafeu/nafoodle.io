import _ from 'lodash';

export const MIN_PLAYERS_PER_MATCH = 2;
export const MAX_PLAYERS_PER_MATCH = 2;

export const getDefaultGameState = (users) => {
  const phase = 'TURN';
  const players = _.map(users, user => {
    return {
      move: null,
      hp: 100,
      ...user
    };
  });

  const playerCount = players.length;
  const activePlayerIndex = 0;

  const results = "";

  return {
    phase,
    players,
    playerCount,
    activePlayerIndex,
    results
  }
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

export const getNewGameState = (gameState, input) => {
  let newGameState = { ...gameState }

  switch(gameState.phase) {
    case 'TURN':
      if (isLastPlayer(gameState)) {
        newGameState.phase = 'RESULTS';
        newGameState.players[gameState.activePlayerIndex].move = input.move;
        newGameState.results = getResults(gameState);
      } else {
        newGameState.players[gameState.activePlayerIndex].move = input.move;
        newGameState.activePlayerIndex += 1;
      }
      break;
    case 'RESULTS':
      if (input.action === 'NEW_GAME') {
        newGameState = getDefaultGameState(gameState.players);
      }
      break;
    default:
      break;
  }

  return newGameState;
}

export const isLastPlayer = (gameState) => {
  return gameState.activePlayerIndex === gameState.playerCount - 1;
}

export const getResults = (gameState) => {
  if (gameState.players[0].move === gameState.players[1].move) {
    return `Tie game! ${gameState.players[0].username} and ${gameState.players[1].username} both picked ${gameState.players[1].move}`;
  }

  if (
    (gameState.players[0].move === "rock" && gameState.players[1].move === "scissors") ||
    (gameState.players[0].move === "scissors" && gameState.players[1].move === "paper") ||
    (gameState.players[0].move === "paper" && gameState.players[1].move === "rock")
  ) {
    return `${gameState.players[0].username}'s ${gameState.players[0].move} beats ${gameState.players[1].username}'s ${gameState.players[1].move}, ${gameState.players[0].username} wins!`;
  }

  return `${gameState.players[1].username}'s ${gameState.players[1].move} beats ${gameState.players[0].username}'s ${gameState.players[0].move}, ${gameState.players[1].username} wins!`;
}