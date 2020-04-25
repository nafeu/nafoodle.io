import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import _ from 'lodash';
import { getCard } from '../../services';
import { getRandomNumbers } from '../../../../../utils/helpers';
import { useSpring, animated, useTransition } from 'react-spring';

const randomNumbers = getRandomNumbers(1000);
const DEFAULT_MESSINESS = 5;
const MESSINESS_DISPLACEMENT = 0.33;

const useStyles = createUseStyles(theme => ({
  pileContainer: {
    position: "absolute",
    top: `calc(50% + ${theme.card.height / 2}px)`,
    left: `calc(50% - ${theme.card.width / 2}px)`,
  },
  pileCard: {
    width: `${theme.card.width}px`,
    backgroundColor: theme.card.frontColor,
    height: `${theme.card.height}px`,
    color: theme.colorPrimary,
    borderRadius: "5px",
    border: `2px solid ${theme.colorPrimary}`,
    position: "absolute",
    right: "0px",
    bottom: "0px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bolder",
    fontSize: theme.card.fontSize,
    transition: "250ms ease-out transform",
    cursor: "pointer"
  },
  pileCardContent: {
    paddingBottom: theme.card.bottomPadding
  },
  hiddenTop: {
    backgroundColor: theme.colorBackground
  },
  pileIcon: {
    fontSize: theme.card.iconSize
  }
}));

function Pile({
  pile,
  position,
  messiness,
  player,
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const maxRandomRotation = messiness ? messiness : DEFAULT_MESSINESS;
  const maxDisplacement = messiness ? (messiness * MESSINESS_DISPLACEMENT) : (DEFAULT_MESSINESS * MESSINESS_DISPLACEMENT);

  let transform = "";

  if (player === 'top') {
    transform = `translateY(${-theme.card.height * 0.66}px)`;
  } else if (player === 'bottom') {
    transform = `translateY(${theme.card.height * 0.66}px)`;
  }

  const indexedPile = _.map(pile, (card, index) => {
    return {
      ...card,
      index
    }
  });

  const transitions = useTransition(indexedPile, card => card.id, {
    from: { opacity: 0, motion: player === 'bottom' ? -100 : 100 },
    enter: { opacity: 1, motion: 0 },
    leave: { opacity: 0, motion: player === 'bottom' ? -100 : 100 }
  });

  return (
    <div className={classes.pileContainer} style={{ transform }}>
      {transitions.map(({ item, props, key }) => {
          const card = getCard(item.cardId);
          const playerIndex = player && player === 'top' ? item.index + 100 : item.index;
          const rotation = (randomNumbers[playerIndex] * (maxRandomRotation * 2)) - maxRandomRotation;
          const xDisplacement = (randomNumbers[playerIndex] * maxDisplacement) * (randomNumbers[playerIndex] > 0.5 ? -1 : 1);
          const yDisplacement = (randomNumbers[playerIndex] * maxDisplacement) * (randomNumbers[playerIndex] > 0.5 ? -1 : 1);

          const isHidden = item.face === 'down';

          return (
            <animated.div
              key={key}
              className={`${classes.pileCard} ${isHidden ? classes.hiddenTop : ''}`}
              style={{
                transform: `rotateZ(${rotation}deg) translate(${xDisplacement}px, ${yDisplacement}px)`,
                opacity: props.opacity,
                bottom: props.motion,
              }}
            >
              {isHidden ? (
                <div
                  className={classes.pileCardContent}
                  style={{
                    transform: player && player === 'top' ? "rotateZ(180deg)" : '',
                  }}>
                    <div className={classes.pileIcon}>🤔</div>
                </div>
              ) : (
                <div
                  className={classes.pileCardContent}
                  style={{
                    transform: player && player === 'top' ? "rotateZ(180deg)" : '',
                  }}>
                    <div className={classes.pileIcon}>{card.icon}</div>
                    <div>{card.name}</div>
                </div>
              )}
            </animated.div>
          );
        })
      }
    </div>
  );
}

export default Pile;