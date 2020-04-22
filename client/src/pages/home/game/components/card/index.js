import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { getCardTransformation } from './helpers';

const useStyles = createUseStyles(theme => ({
  card: {
    width: "75px",
    backgroundColor: theme.colorPrimary,
    textAlign: "center",
    height: "125px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.colorDark,
    fontWeight: "bolder",
    fontSize: "0.75em",
    border: `2px solid ${theme.colorDark}`,
    transition: "250ms ease-out all",
    position: "relative"
  },
  cardContent: {
    paddingBottom: "20px"
  },
  hidden: {
    backgroundColor: theme.colorTitle
  }
}));

function Card({ card, index, count, hidden }) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const transform = getCardTransformation(index, count);

  return (
    <div className={`${classes.card} ${hidden ? classes.hidden : ''}`} style={{ transform }}>
      <div className={classes.cardContent}>{hidden ? '' : card.name}</div>
    </div>
  );
}

export default Card;