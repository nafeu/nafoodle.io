import { toWords } from 'number-to-words';
import _ from 'lodash';
import { uuidv4 } from '../utils/helpers';

export const getGameStateInfo = (gameState) => {
  const output = {};

  _.each(gameState.players, (player, index) => {
    output[`player${capitalize(toWords(index + 1))}`] = player;
  });

  const activePlayer = gameState.players[gameState.activePlayerIndex];

  output['allPlayers'] = gameState.players;
  output['activePlayer'] = gameState.players[gameState.activePlayerIndex];
  output['activePlayerDoneActions'] = activePlayer.actionCount === gameState.actionLimit - 1;
  output['isLastPlayer'] = gameState.activePlayerIndex === gameState.playerCount - 1;

  return output;
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const hasItems = (array) => {
  return array.length > 0;
}

export const lastItem = (array) => {
  return _.last(array);
}

export const setNextPlayerActive = (gameState) => {
  if (gameState.activePlayerIndex === gameState.playerCount - 1) {
    gameState.activePlayerIndex = 0;
  } else {
    gameState.activePlayerIndex += 1;
  }
  return gameState;
}

export const incrementTurnCount = (gameState) => {
  gameState.turnCount += 1;
  return gameState;
}

export const resetActionCount = (player) => {
  player.actionCount = 0;
}