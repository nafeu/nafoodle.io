import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { getCardTransformation } from './helpers';
import { useSpring, animated, config, useTransition } from 'react-spring';

const useStyles = createUseStyles(theme => ({
  card: {
    width: `${theme.cardWidth}px`,
    backgroundColor: theme.colorPrimary,
    height: `${theme.cardHeight}px`,
    color: theme.colorDark,
    border: `2px solid ${theme.colorDark}`,
    borderRadius: "5px",
    position: "relative",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bolder",
    fontSize: "0.75em",
    transition: "250ms ease-out transform",
    cursor: "pointer"
  },
  cardContent: {
    paddingBottom: "20px"
  },
  hidden: {
    backgroundColor: theme.colorTitle
  }
}));

function Card({
  card,
  index,
  count,
  hidden,
  owner,
  handleClick,
  canClick
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const transform = getCardTransformation(index, count);

  const [{ yMotion }, setHover] = useSpring(() => ({
    yMotion: 0,
    config: { mass: 1, tension: 500, friction: 60 }
  }));

  const [{ opacity, left }] = useSpring(() => ({
    opacity: 1,
    left: 0,
    from: {
      opacity: 0,
      left: 20
    },
    config: { duration: 350 }
  }));

  const handleMouseEnter = () => {
    if (owner) {
      setHover({ yMotion: 20 });
    }
  }

  const handleMouseLeave = () => {
    if (owner) {
      setHover({ yMotion: 0 });
    }
  }

  return (
    <animated.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick(card, index)}
      className={`${classes.card} ${hidden ? classes.hidden : ''}`}
      style={{
        transform,
        top: yMotion.interpolate(v => `-${v}px`),
        opacity,
        left
      }}
    >
      <div className={classes.cardContent}>{hidden ? '' : card.name}</div>
    </animated.div>
  );
}

export default Card;