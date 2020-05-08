import React from 'react';
import _ from 'lodash';
import { createUseStyles } from 'react-jss';
import Card from '../card';

const useStyles = createUseStyles(theme => ({
  handContainer: {
    bottom: "6.5%",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)"
  },
  handContainerLeft: {
    top: "50%",
    left: `${theme.card.width}px`,
    position: "absolute",
    transform: "translate(-50%, -50%) rotateZ(-90deg)"
  },
  handContainerRight: {
    top: "50%",
    left: `calc(100% - ${theme.card.width}px)`,
    position: "absolute",
    transform: "translate(-50%, -50%) rotateZ(90deg)"
  },
  handContainerTop: {
    left: "50%",
    position: "absolute",
    transform: "translateX(-50%)"
  },
  handContainerBottomMiddleRight: {
    bottom: "8%",
    position: "absolute",
    left: "55%",
    transform: "translateX(-45%)"
  },
  hand: {
    display: "inline-block"
  },
  cardContainer: {
    display: "flex"
  },
}));

function Hand({ hand, position, hidden, owner, handleCardClick, canClick, getCard }) {
  const classes = useStyles();

  const getPositionClass = (position) => {
    if (position === 'left') {
      return classes.handContainerLeft;
    } else if (position === 'right') {
      return classes.handContainerRight;
    } else if (position === 'top') {
      return classes.handContainerTop;
    } else if (position === 'bottom-middle-right') {
      return classes.handContainerBottomMiddleRight;
    } else {
      return classes.handContainer;
    }
  }

  return (
    <div className={getPositionClass(position)}>
      <div className={classes.hand}>
        <div className={classes.cardContainer}>
          {_.map(hand, (card, index) => {
            return (
              <Card
                key={`${card.id}`}
                card={getCard(card.cardId)}
                index={index}
                count={hand.length}
                hidden={!owner}
                handleCardClick={handleCardClick}
                owner={owner}
                canClick={canClick}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Hand;