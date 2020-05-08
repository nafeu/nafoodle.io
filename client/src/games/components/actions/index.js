import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  actionsContainer: {
    position: "absolute",
    bottom: "2%",
    left: "20%",
    width: "20%",
    height: "33%"
  },
  actions: {
    position: "relative",
    width: "100%",
    height: "auto",
    fontSize: "0.75em",
    overflowY: "scroll"
  },
  action: {
    padding: "5px",
    backgroundColor: theme.colorDark,
    marginBottom: "5px",
    cursor: "pointer"
  },
  disabled: {
    opacity: "0.5"
  }
}));

function Actions({ actions, handleClick, disabled }) {
  const classes = useStyles();

  return (
    <div className={classes.actionsContainer}>
      <div className={`${classes.actions} ${disabled ? classes.disabled : ''}`}>
        {
          actions.map(({ id, name, desc }) => {
            return <div className={classes.action} onClick={() => handleClick(id)}>{name} : {desc}</div>
          })
        }
      </div>
    </div>
  );
}

export default Actions;