import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import _ from 'lodash';
import { getCard } from '../../services';
import { getRandomNumbers } from '../../../../../utils/helpers';

const randomNumbers = getRandomNumbers(1000);
const DEFAULT_MESSINESS = 5;
const MESSINESS_DISPLACEMENT = 0.33;

const useStyles = createUseStyles(theme => ({
  pileContainer: {
    position: "absolute",
    top: `calc(50% + ${theme.cardHeight / 2}px)`,
    left: `calc(50% - ${theme.cardWidth / 2}px)`,
  },
  pileCard: {
    width: `${theme.cardWidth}px`,
    backgroundColor: theme.colorPrimary,
    height: `${theme.cardHeight}px`,
    color: theme.colorDark,
    borderRadius: "5px",
    border: `2px solid ${theme.colorDark}`,
    position: "absolute",
    right: "0px",
    bottom: "0px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bolder",
    fontSize: "0.75em",
    transition: "250ms ease-out transform",
    cursor: "pointer"
  },
  pileCardContent: {
    paddingBottom: "20px"
  },
}));

function Pile({
  pile,
  position,
  messiness
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const maxRandomRotation = messiness ? messiness : DEFAULT_MESSINESS;
  const maxDisplacement = messiness ? (messiness * MESSINESS_DISPLACEMENT) : (DEFAULT_MESSINESS * MESSINESS_DISPLACEMENT);

  return (
    <div className={classes.pileContainer}>
      {_.map(pile, (cardId, index) => {
          const card = getCard(cardId);
          const rotation = (randomNumbers[index] * (maxRandomRotation * 2)) - maxRandomRotation;
          const xDisplacement = (randomNumbers[index] * maxDisplacement) * (randomNumbers[index] > 0.5 ? -1 : 1);
          const yDisplacement = (randomNumbers[index] * maxDisplacement) * (randomNumbers[index] > 0.5 ? -1 : 1);
          return (
            <div
              className={classes.pileCard}
              style={{
                transform: `rotateZ(${rotation}deg) translate(${xDisplacement}px, ${yDisplacement}px)`
              }}
            >
                <div className={classes.pileCardContent}>{card.name}</div>
            </div>
          );
        })
      }
    </div>
  );
}

export default Pile;