import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import _ from 'lodash';

const useStyles = createUseStyles(theme => ({
  deckContainer: {
    position: "absolute",
    right: "1%",
    bottom: "1%"
  },
  deckContainerLeft: {
    position: "absolute",
    left: "1%",
    bottom: "1%",
    transform: "rotateZ(90deg)"
  },
  deckContainerRight: {
    position: "absolute",
    right: "1%",
    top: "1%",
    transform: "rotateZ(-90deg)"
  },
  deckContainerTop: {
    position: "absolute",
    left: "1%",
    top: "1%",
    transform: "rotateZ(180deg)"
  },
  deckContainerMiddle: {
    position: "absolute",
    top: `calc(50% + ${theme.cardHeight / 2}px)`,
    left: `calc(50% + ${(theme.cardWidth / 2) + theme.cardWidth}px)`,
  },
  deckCard: {
    width: `${theme.cardWidth}px`,
    backgroundColor: theme.colorTitle,
    height: `${theme.cardHeight}px`,
    borderRadius: "5px",
    border: `2px solid ${theme.colorDark}`,
    position: "absolute",
    cursor: "pointer"
  },
  cardContent: {
    paddingBottom: "20px"
  },
}));

function Deck({
  deck,
  position
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const getDeckClass = (position) => {
    if (position === 'left') {
      return classes.deckContainerLeft;
    } else if (position === 'right') {
      return classes.deckContainerRight;
    } else if (position === 'top') {
      return classes.deckContainerTop;
    } else if (position === 'middle') {
      return classes.deckContainerMiddle;
    } else {
      return classes.deckContainer;
    }
  }

  return (
    <div className={getDeckClass(position)}>
      {_.map(deck, (card, index) => {
          const distance = index * 0.1;
          return (
            <div
              className={classes.deckCard}
              style={{
                right: `${distance}px`,
                bottom: `${distance}px`,
              }}>
            </div>
          );
        })
      }
    </div>
  );
}

export default Deck;