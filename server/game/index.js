import _ from 'lodash';
import { isLastPlayer, getPlayers } from './helpers';

export const MIN_PLAYERS_PER_MATCH = 2;
export const MAX_PLAYERS_PER_MATCH = 2;

export const getRoomStatus = (room) => {
  if (room.status === 'WAITING') {
    if (room.users.length >= MIN_PLAYERS_PER_MATCH
        && room.users.length <= MAX_PLAYERS_PER_MATCH) {
      return 'READY';
    }
  }
  if (room.status === 'READY') {
    if (room.users.length < MIN_PLAYERS_PER_MATCH) {
      return 'WAITING';
    }
  }
  return room.status;
}

export const getDefaultGameState = (users) => {
  const phase = 'START';

  const players = _.map(users, user => {
    return {
      ...user,
      action: null,
      actionCount: 0,
      hp: 20,
      hand: []
    };
  });

  const playerCount = players.length;

  const deck = _.map(_.range(20), card => _.random(0, 2));
  const handStart = 3;

  players.forEach(player => {
    _.each(_.range(handStart), iteration => {
      player.hand.push(deck.pop());
    });
  });

  const results = {};

  return {
    phase,
    players,
    playerCount,
    activePlayerIndex: 0,
    turnDirection: 1,
    turnCount: 0,
    deck,
    handLimit: 5,
    handStart,
    actionLimit: 1,
    results
  }
}

export const getNextGameState = (gameState, input) => {
  let nextGameState = { ...gameState };

  switch(gameState.phase) {
    case 'START':
      nextGameState = moveFromPhaseStart(gameState, input);
      break;
    case 'TURN':
      nextGameState = moveFromPhaseTurn(gameState, input);
      break;
    case 'DRAW':
      nextGameState = moveFromPhaseDraw(gameState, input);
      break;
    case 'ACTION':
      nextGameState = moveFromPhaseAction(gameState, input);
      break;
    case 'REACTION':
      nextGameState = moveFromPhaseReaction(gameState, input);
      break;
    case 'END':
      nextGameState = moveFromPhaseEnd(gameState, input);
      break;
    case 'MATCH':
      nextGameState = moveFromPhaseMatch(gameState, input);
      break;
    case 'RESULTS':
      nextGameState = moveFromPhaseResults(gameState, input);
      break;
    default:
      break;
  }

  return nextGameState;
}

export const goToPhaseStart = (gameState, input) => {
  let nextGameState = { ...gameState };

  nextGameState = getDefaultGameState(gameState.players);

  return nextGameState;
}

export const moveFromPhaseStart = (gameState, input) => {
  let nextGameState = { ...gameState };

  if (input.action === 'NEXT_PHASE') {
    nextGameState = goToPhaseTurn(gameState, input);
  }

  return nextGameState;
}

export const goToPhaseTurn = (gameState, input) => {
  let nextGameState = { ...gameState };

  nextGameState.phase = 'TURN';
  nextGameState.players[gameState.activePlayerIndex].actionCount = 0;

  return nextGameState;
}

export const moveFromPhaseTurn = (gameState, input) => {
  let nextGameState = { ...gameState };

  if (input.action === 'NEXT_PHASE') {
    nextGameState = goToPhaseDraw(gameState, input);
  }

  return nextGameState;
}

export const goToPhaseDraw = (gameState, input) => {
  let nextGameState = { ...gameState };

  nextGameState.phase = 'DRAW';
  nextGameState.players[gameState.activePlayerIndex].hand.push(nextGameState.deck.pop());

  return nextGameState;
}

export const moveFromPhaseDraw = (gameState, input) => {
  let nextGameState = { ...gameState };

  if (input.action === 'NEXT_PHASE') {
    nextGameState = goToPhaseAction(gameState, input);
  }

  return nextGameState;
}

export const goToPhaseAction = (gameState, input) => {
  let nextGameState = { ...gameState };

  nextGameState.phase = 'ACTION';

  return nextGameState;
}

export const moveFromPhaseAction = (gameState, input) => {
  let nextGameState = { ...gameState };

  if (input.action === 'PLAY_CARD') {
    nextGameState.players[gameState.activePlayerIndex].action = input.cardId;
    nextGameState.players[gameState.activePlayerIndex].actionCount += 1;
    nextGameState.players[gameState.activePlayerIndex].hand.splice(input.index, 1);

    if (nextGameState.players[gameState.activePlayerIndex].actionCount === gameState.actionLimit) {
      nextGameState = goToPhaseEnd(nextGameState, input);
    }
  }

  return nextGameState;
}

export const goToPhaseEnd = (gameState, input) => {
  let nextGameState = { ...gameState };

  nextGameState.phase = 'END';

  return nextGameState;
}

export const moveFromPhaseEnd = (gameState, input) => {
  let nextGameState = { ...gameState };

  if (input.action === 'NEXT_PHASE') {
    if (gameState.activePlayerIndex === gameState.playerCount - 1) {
      nextGameState.activePlayerIndex = 0;
      nextGameState = goToPhaseMatch(nextGameState, input);
    } else {
      nextGameState.activePlayerIndex += 1;
      nextGameState = goToPhaseTurn(nextGameState, input);
    }
  }

  return nextGameState;
}

// Unused in Rock Paper Scissors Example
export const moveFromPhaseReaction = (gameState, input) => {
  let nextGameState = { ...gameState };

  return nextGameState;
}

export const goToPhaseMatch = (gameState, input) => {
  let nextGameState = { ...gameState };

  nextGameState.phase = 'MATCH';

  if (nextGameState.players[0].action === nextGameState.players[1].action) {
    nextGameState.results.message = 'no one takes any damage';
  } else if (
    (nextGameState.players[0].action === 0 && nextGameState.players[1].action === 2) ||
    (nextGameState.players[0].action === 1 && nextGameState.players[1].action === 0) ||
    (nextGameState.players[0].action === 2 && nextGameState.players[1].action === 1)
  ) {
    nextGameState.players[1].hp -= 10;
    nextGameState.results.message = `${nextGameState.players[1].username} takes 10 damage.`;
  } else {
    nextGameState.players[0].hp -= 10;
    nextGameState.results.message = `${nextGameState.players[0].username} takes 10 damage.`;
  }

  return nextGameState;
}

export const moveFromPhaseMatch = (gameState, input) => {
  let nextGameState = { ...gameState };

  if (input.action === 'NEXT_PHASE') {
    if (nextGameState.players[0].hp <= 0 || nextGameState.players[1].hp <= 0) {
      nextGameState = goToPhaseResults(nextGameState, input);
    } else {
      nextGameState.turnCount += 1;
      nextGameState = goToPhaseTurn(nextGameState, input);
    }
  }

  return nextGameState;
}

export const goToPhaseResults = (gameState, input) => {
  let nextGameState = { ...gameState };

  nextGameState.phase = 'RESULTS';
  nextGameState.results.winner = (nextGameState.players[0].hp > nextGameState.players[1].hp)
    ? nextGameState.players[0].username
    : nextGameState.players[1].username;

  return nextGameState;
}

export const moveFromPhaseResults = (gameState, input) => {
  let nextGameState = { ...gameState };

  if (input.action === 'NEW_GAME') {
    nextGameState = goToPhaseStart(nextGameState, input);
  }

  return nextGameState;
}
