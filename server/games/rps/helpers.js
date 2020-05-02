import _ from 'lodash';
import { uuidv4 } from '../../utils/helpers';

export const generateDeck = (size) => {
  return _.map(_.range(size), iteration => {
    return {
      cardId: _.random(0, 2),
      id: uuidv4(),
      face: 'up'
    }
  });
}
