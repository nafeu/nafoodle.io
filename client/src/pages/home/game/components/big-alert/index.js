import React, { useState } from 'react';
import _ from 'lodash';
import { createUseStyles, useTheme } from 'react-jss';
import { useTransition, animated } from 'react-spring';

const useStyles = createUseStyles(theme => ({
  bigAlertContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%"
  },
  bigAlertModal: {
    width: "100vw",
    height: "40vh",
    position: "absolute",
    zIndex: "-1",
    opacity: "0.9"
  },
  bigAlertTitle: {
    fontWeight: "bolder",
    fontSize: "2.5em",
    padding: "20px",
    color: "black",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 10px black"
  },
  bigAlertBody: {
    fontSize: "1.5em",
    padding: "10px",
    color: "black",
    margin: "15px",
    borderRadius: "10px",
    backgroundColor: "white"
  }
}));

function BigAlert({ title, body, show, type, alive }) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const transitions = useTransition(show, null, {
    from: { opacity: 0, transform: 'translate(-50%, -60%)' },
    // enter: item => async (next, cancel) => {
    //   await next({ opacity: 1, transform: 'translate(-50%, -50%)' });
    //   await new Promise(resolve => setTimeout(resolve, alive));
    //   await next({ opacity: 0, transform: 'translate(-50%, -40%)' });
    // },
    enter: { opacity: 1, transform: 'translate(-50%, -50%)' },
    leave: { opacity: 0, transform: 'translate(-50%, -40%)' },
  });

  const getTypeColor = (type) => {
    const typeColorMap = {
      'info': theme.colorInfo,
      'warning': theme.colorWarning,
      'success': theme.colorSuccess,
      'error': theme.colorError
    }

    if (!typeColorMap[type]) {
      return theme.colorDark;
    }

    return typeColorMap[type];
  }

  return transitions.map(({ item, key, props }) => {
    return item && (
      <animated.div className={classes.bigAlertContainer} style={props}>
        <div className={classes.bigAlertModal} style={{ backgroundColor: getTypeColor(type) }}></div>
        <div className={classes.bigAlertTitle} style={{ color: getTypeColor(type) }}>{title}</div>
        <div className={classes.bigAlertBody} style={{ color: getTypeColor(type) }}>{body}</div>
      </animated.div>
    )
  });
}

export default BigAlert;