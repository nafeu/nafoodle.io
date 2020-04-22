import React from 'react';
import _ from 'lodash';
import { createUseStyles } from 'react-jss';
import Card from '../card';
import { getCard } from '../../services';

const useStyles = createUseStyles(theme => ({
  handContainer: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    bottom: "10px"
  },
  hand: {
    display: "inline-block"
  },
  cardContainer: {
    display: "flex"
  },
}));

function Hand({ hand }) {
  const classes = useStyles();

  return (
    <div className={classes.handContainer}>
      <div className={classes.hand}>
        <div className={classes.cardContainer}>
          {_.map(hand, (card, index) => {
            return (
              <Card
                key={`${index}-${card}`}
                card={getCard(card)}
                index={index}
                count={hand.length}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Hand;