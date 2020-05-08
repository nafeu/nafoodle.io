import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  helpContainer: {
    position: "absolute",
    bottom: "2%",
    left: "72%",
    width: "19%",
    height: "33%"
  },
  help: {
    position: "relative",
    width: "100%",
    height: "auto",
    fontSize: "0.75em",
    overflowY: "scroll"
  },
}));

function Help({ title, header, body }) {
  const classes = useStyles();

  return (
    <div className={classes.helpContainer}>
      <div className={classes.help}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </div>
  );
}

export default Help;