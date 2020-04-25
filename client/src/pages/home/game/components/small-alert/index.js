import React, { useState } from 'react';
import _ from 'lodash';
import { createUseStyles, useTheme } from 'react-jss';
import { useTransition, animated } from 'react-spring';

const useStyles = createUseStyles(theme => ({
  smallAlertContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    left: "75%",
    top: "75%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%"
  },
  smallAlertModal: {
    width: "40vw",
    borderRadius: theme.borderRadius,
    height: "40vh",
    position: "absolute",
    zIndex: "-1",
    opacity: "0.4"
  },
  smallAlertTitle: {
    fontWeight: "bolder",
    fontSize: "1.5em",
    padding: "20px",
    color: "black",
    borderRadius: "10px",
    boxShadow: "0px 10px black"
  },
  smallAlertBody: {
    fontSize: "0.75em",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "10px",
    backgroundColor: "black",
    color: "white",
  }
}));

function SmallAlert({ title, body, show, type, alive }) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const transitions = useTransition(show, null, {
    from: { opacity: 0, transform: 'translate(-50%, -40%)' },
    // enter: item => async (next, cancel) => {
    //   await next({ opacity: 1, transform: 'translate(-50%, -50%)' });
    //   await new Promise(resolve => setTimeout(resolve, alive));
    //   await next({ opacity: 0, transform: 'translate(-50%, -40%)' });
    // },
    enter: { opacity: 1, transform: 'translate(-50%, -50%)' },
    leave: { opacity: 0, transform: 'translate(-50%, -60%)' },
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
      <animated.div className={classes.smallAlertContainer} style={props}>
        {/*<div className={classes.smallAlertModal} style={{ backgroundColor: getTypeColor(type) }}></div>*/}
        <div className={classes.smallAlertTitle} style={{ backgroundColor: getTypeColor(type) }}>
          {title}
          {body.length && <div className={classes.smallAlertBody} style={{ color: getTypeColor(type) }}>{body}</div>}
        </div>
      </animated.div>
    )
  });
}

export default SmallAlert;