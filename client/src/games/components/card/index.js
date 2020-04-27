import React, { useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { getCardTransformation } from './helpers';
import { useSpring, animated } from 'react-spring';

const useStyles = createUseStyles(theme => ({
  card: {
    width: `${theme.card.width}px`,
    backgroundColor: theme.card.frontColor,
    height: `${theme.card.height}px`,
    color: theme.colorPrimary,
    border: `2px solid ${theme.colorPrimary}`,
    borderRadius: "5px",
    position: "relative",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bolder",
    fontSize: theme.card.fontSize,
    transition: "250ms ease-out transform",
    cursor: "pointer"
  },
  cardContent: {
    paddingBottom: theme.card.bottomPadding
  },
  cardIcon: {
    fontSize: theme.card.iconSize
  },
  hidden: {
    backgroundColor: theme.card.backColor,
    fontSize: theme.card.iconSize
  }
}));

function Card({
  card,
  index,
  count,
  hidden,
  owner,
  handleCardClick,
  canClick
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const transform = getCardTransformation(index, count);
  const [chosen, setChosen] = useState(false);

  const [{ yMotion, cardOpacity, xMotion }, set] = useSpring(() => ({
    yMotion: 0,
    cardOpacity: 1,
    xMotion: 0,
    from: {
      cardOpacity: 0,
      xMotion: 100
    },
    config: { mass: 1, tension: 500, friction: 60 }
  }));

  const handleMouseEnter = () => {
    if (owner && !chosen) {
      set({ yMotion: 20 });
    }
  }

  const handleMouseLeave = () => {
    if (owner && !chosen) {
      set({ yMotion: 0 });
    }
  }

  const handleClick = () => {
    if (canClick && !chosen) {
      set({ yMotion: 100, cardOpacity: 0 });
      setChosen(true);
      setTimeout(() => handleCardClick(card, index), 250);
    }
  }

  return (
    <animated.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`${classes.card} ${hidden ? classes.hidden : ''}`}
      style={{
        transform,
        top: yMotion.interpolate(v => `-${v}px`),
        opacity: cardOpacity.interpolate(v => v),
        left: xMotion.interpolate(v => `${v}px`),
      }}
    >
      <div className={classes.cardContent}>
        {hidden && '🤔'}
        {!hidden && (
          <React.Fragment>
            <div className={classes.cardIcon}>{card.icon}</div>
            <div>{card.name}</div>
          </React.Fragment>
        )}
      </div>
    </animated.div>
  );
}

export default Card;