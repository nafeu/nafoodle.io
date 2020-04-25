import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  matContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: theme.mat.width,
    height: theme.mat.height,
    transform: "translate(-50%, -50%)"
  },
  mat: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: theme.colorDark,
    borderRadius: theme.mat.borderRadius
  }
}));

function Mat({ color }) {
  const classes = useStyles();

  return (
    <div className={classes.matContainer}>
      <div className={classes.mat} style={{ backgroundColor: color }}></div>
    </div>
  );
}

export default Mat;