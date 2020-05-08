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
    top: `calc(50% + ${theme.card.height / 2}px)`,
    left: `calc(50% + ${(theme.card.width / 2) + theme.card.width}px)`,
  },
  deckContainerBottomRight: {
    position: "absolute",
    bottom: "7%",
    right: "1%",
  },
  deckCard: {
    width: `${theme.card.width}px`,
    backgroundColor: theme.colorBackground,
    height: `${theme.card.height}px`,
    borderRadius: "5px",
    border: `2px solid ${theme.colorPrimary}`,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bolder",
    fontSize: theme.card.iconSize,
    cursor: "pointer"
  },
  cardContent: {
    paddingBottom: theme.card.bottomPadding
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
    } else if (position === 'bottom-right') {
      return classes.deckContainerBottomRight;
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
              key={card.id}
              className={classes.deckCard}
              style={{
                right: `${distance}px`,
                bottom: `${distance}px`,
              }}>
              <div className={classes.cardContent}>
                <span role="img" aria-label="thinking">🤔</span>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default Deck;