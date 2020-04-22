import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import _ from 'lodash';
import { getCard } from '../../services';
import { getRandomNumbers } from '../../../../../utils/helpers';
import { useSpring, animated } from 'react-spring';

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
  messiness,
  player
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const maxRandomRotation = messiness ? messiness : DEFAULT_MESSINESS;
  const maxDisplacement = messiness ? (messiness * MESSINESS_DISPLACEMENT) : (DEFAULT_MESSINESS * MESSINESS_DISPLACEMENT);

  let transform = "";

  if (player === 'top') {
    transform = `translateY(${-theme.cardHeight * 0.66}px)`;
  } else if (player === 'bottom') {
    transform = `translateY(${theme.cardHeight * 0.66}px)`;
  }

  const [{ yMotion, cardOpacity }] = useSpring(() => ({
    cardOpacity: 1,
    from: {
      cardOpacity: 0,
    },
    config: { mass: 1, tension: 500, friction: 60 }
  }));

  return (
    <div className={classes.pileContainer} style={{ transform }}>
      {_.map(pile, (cardId, index) => {
          const card = getCard(cardId);
          const playerIndex = player && player === 'top' ? index + 100 : index;
          const rotation = (randomNumbers[playerIndex] * (maxRandomRotation * 2)) - maxRandomRotation;
          const xDisplacement = (randomNumbers[playerIndex] * maxDisplacement) * (randomNumbers[playerIndex] > 0.5 ? -1 : 1);
          const yDisplacement = (randomNumbers[playerIndex] * maxDisplacement) * (randomNumbers[playerIndex] > 0.5 ? -1 : 1);

          return (
            <div
              className={classes.pileCard}
              style={{
                transform: `rotateZ(${rotation}deg) translate(${xDisplacement}px, ${yDisplacement}px)`,
                opacity: cardOpacity.interpolate(v => v),
              }}
            >
                <div
                  className={classes.pileCardContent}
                  style={{
                    transform: player && player === 'top' ? "rotateZ(180deg)" : '',
                  }}>
                    {card.name}
                </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default Pile;