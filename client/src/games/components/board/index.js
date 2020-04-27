import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  boardContainer: {
    position: "absolute",
    width: "98%",
    height: "95%",
    margin: "1%"
  },
  board: {
    position: "relative",
    width: "100%",
    height: "100%"
  }
}));

function Board({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.boardContainer}>
      <div className={classes.board}>
        {children}
      </div>
    </div>
  );
}

export default Board;