import rps from './rps';

export const getGame = game => {
  switch (game) {
    case 'rps':
      return rps;
      break;
    default:
      return rps;
  }
}
