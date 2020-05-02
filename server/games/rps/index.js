import _ from 'lodash';
import {
  getGameStateInfo,
  hasItems,
  lastItem,
  setNextPlayerActive,
  incrementTurnCount,
  resetActionCount
} from '../helpers';
import { generateDeck } from './helpers';

const MIN_PLAYERS_PER_ROOM = 2;
const MAX_PLAYERS_PER_ROOM = 2;

const game = {
  MIN_PLAYERS_PER_ROOM,
  MAX_PLAYERS_PER_ROOM,

  getRoomStatus: (room) => {
    if (room.status === 'WAITING') {
      if (room.users.length >= MIN_PLAYERS_PER_ROOM
          && room.users.length <= MAX_PLAYERS_PER_ROOM) {
        return 'READY';
      }
    }
    if (room.status === 'READY') {
      if (room.users.length < MIN_PLAYERS_PER_ROOM) {
        return 'WAITING';
      }
    }
    return room.status;
  },

  getDefaultGameState: (users) => {
    const phase = 'START';

    const players = _.map(users, user => {
      return {
        ...user,
        action: null,
        actionCount: 0,
        hp: 20,
        hand: [],
        pile: []
      };
    });

    const playerCount = players.length;

    const deck = generateDeck(20);
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
  },

  getNextGameState: (gameState, input) => {
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
}

export const goToPhaseStart = (gameState, input) => {
  let nextGameState = { ...gameState };

  nextGameState = game.getDefaultGameState(gameState.players);

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
  const { activePlayer } = getGameStateInfo(nextGameState);

  nextGameState.phase = 'TURN';
  resetActionCount(activePlayer);

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
  const { activePlayer } = getGameStateInfo(nextGameState);

  nextGameState.phase = 'DRAW';
  activePlayer.hand.push(nextGameState.deck.pop());

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
  const { activePlayer, activePlayerDoneActions } = getGameStateInfo(nextGameState);

  if (input.action === 'PLAY_CARD') {
    activePlayer.action = input.cardId;
    activePlayer.actionCount += 1;
    activePlayer.pile.push({
      ...activePlayer.hand.splice(input.index, 1)[0],
      face: 'down'
    });

    if (activePlayerDoneActions) {
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
  const { playerOne, playerTwo, isLastPlayer } = getGameStateInfo(nextGameState);

  if (input.action === 'NEXT_PHASE') {
    if (isLastPlayer) {
      if (hasItems(playerOne.pile)) { lastItem(playerOne.pile).face = 'up'; }
      if (hasItems(playerTwo.pile)) { lastItem(playerTwo.pile).face = 'up'; }
      setNextPlayerActive(nextGameState);
      nextGameState = goToPhaseMatch(nextGameState, input);
    } else {
      setNextPlayerActive(nextGameState);
      nextGameState = goToPhaseTurn(nextGameState, input);
    }
  }

  return nextGameState;
}

export const moveFromPhaseReaction = (gameState, input) => {
  let nextGameState = { ...gameState };

  return nextGameState;
}

export const goToPhaseMatch = (gameState, input) => {
  let nextGameState = { ...gameState };
  const { playerOne, playerTwo } = getGameStateInfo(nextGameState);

  nextGameState.phase = 'MATCH';

  if (playerOne.action === playerTwo.action) {
    nextGameState.results.title = 'Tie';
    nextGameState.results.body = 'No damage';
    nextGameState.results.recipientId = null;
  } else if (
    (playerOne.action === 0 && playerTwo.action === 2) ||
    (playerOne.action === 1 && playerTwo.action === 0) ||
    (playerOne.action === 2 && playerTwo.action === 1)
  ) {
    playerTwo.hp -= 10;
    nextGameState.results.recipientId = playerTwo.id;
    nextGameState.results.title = 'Ouch';
    nextGameState.results.body = '-10 HP';
  } else {
    playerOne.hp -= 10;
    nextGameState.results.recipientId = playerOne.id;
    nextGameState.results.title = 'Ouch';
    nextGameState.results.body = '-10 HP';
  }

  return nextGameState;
}

export const moveFromPhaseMatch = (gameState, input) => {
  let nextGameState = { ...gameState };
  const { playerOne, playerTwo } = getGameStateInfo(nextGameState);

  if (input.action === 'NEXT_PHASE') {
    if (playerOne.hp <= 0 || playerTwo.hp <= 0) {
      nextGameState = goToPhaseResults(nextGameState, input);
    } else {
      incrementTurnCount(nextGameState);
      nextGameState = goToPhaseTurn(nextGameState, input);
    }
  }

  return nextGameState;
}

export const goToPhaseResults = (gameState, input) => {
  let nextGameState = { ...gameState };
  const { playerOne, playerTwo } = getGameStateInfo(nextGameState);

  nextGameState.phase = 'RESULTS';
  nextGameState.results.winner = (playerOne.hp > playerTwo.hp)
    ? playerOne.username
    : playerTwo.username;

  return nextGameState;
}

export const moveFromPhaseResults = (gameState, input) => {
  let nextGameState = { ...gameState };

  if (input.action === 'NEW_GAME') {
    nextGameState = goToPhaseStart(nextGameState, input);
  }

  return nextGameState;
}

export default game;