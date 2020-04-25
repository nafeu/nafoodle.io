import React from 'react';
import _ from 'lodash';
import { createUseStyles } from 'react-jss';
import Card from '../card';
import { getCard } from '../../services';

const useStyles = createUseStyles(theme => ({
  platformContainer: {
    width: "20%",
    height: "10%",
    bottom: "0%",
    left: "50%",
    position: "absolute",
    transform: "translateX(-50%)"
  },
  platformContainerLeft: {
    width: "20%",
    height: "10%",
    top: "50%",
    left: `calc(3% + ${theme.card.width}px)`,
    position: "absolute",
    transform: "translate(-50%, -50%) rotateZ(-90deg)"
  },
  platformContainerRight: {
    width: "20%",
    height: "10%",
    top: "50%",
    left: `calc(100% - ${theme.card.width}px - 3%)`,
    position: "absolute",
    transform: "translate(-50%, -50%) rotateZ(90deg)"
  },
  platformContainerTop: {
    width: "20%",
    height: "10%",
    top: "12%",
    left: "50%",
    position: "absolute",
    transform: "translateX(-50%)"
  },
  platform: {
    width: "100%",
    height: "100%",
    display: "inline-block",
    boxShadow: `0px ${theme.platform.shadowHeight} ${theme.colorBlack}`,
    borderRadius: theme.platform.borderRadius,
    backgroundColor: theme.colorDark
  },
}));

function Platform({ position, owner, color }) {
  const classes = useStyles();

  const getPositionClass = (position) => {
    if (position === 'left') {
      return classes.platformContainerLeft;
    } else if (position === 'right') {
      return classes.platformContainerRight;
    } else if (position === 'top') {
      return classes.platformContainerTop;
    } else {
      return classes.platformContainer;
    }
  }

  return (
    <div className={getPositionClass(position)}>
      <div className={classes.platform} style={{ backgroundColor: color }}></div>
    </div>
  );
}

export default Platform;