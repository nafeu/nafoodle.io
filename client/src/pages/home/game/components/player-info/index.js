import React from 'react';
import _ from 'lodash';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles(theme => ({
  playerInfoContainer: {
    position: "absolute",
    bottom: "0%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: theme.colorDark,
    padding: "0.5%",
    borderRadius: theme.borderRadius,
    fontSize: "0.75em"
  },
  playerInfoContainerLeft: {
    position: "absolute",
    top: "calc(50% + 25%)",
    transform: "translateY(-50%)",
    backgroundColor: theme.colorDark,
    padding: "0.5%",
    borderRadius: theme.borderRadius,
    fontSize: "0.75em"
  },
  playerInfoContainerRight: {
    position: "absolute",
    top: "calc(50% - 25%)",
    right: "0%",
    transform: "translateY(-50%)",
    backgroundColor: theme.colorDark,
    padding: "0.5%",
    borderRadius: theme.borderRadius,
    fontSize: "0.75em"
  },
  playerInfoContainerTop: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: `calc(4% + ${theme.cardHeight}px)`,
    backgroundColor: theme.colorDark,
    padding: "0.5%",
    borderRadius: theme.borderRadius,
    fontSize: "0.75em"
  },
  playerInfo: {
    width: "100%",
    wordWrap: "break-word"
  },
  playerInfoName: {
    border: "2px solid white",
    backgroundColor: "white",
    color: "black",
    display: "inline-block",
    padding: theme.spacing.cozy,
    fontWeight: "bolder",
    borderRadius: theme.spacing.cozy,
    marginRight: theme.spacing.cozy,
  },
  playerInfoMeta: {
    boxSizing: "border-box",
    border: "2px solid white",
    color: "white",
    display: "inline-block",
    padding: theme.spacing.cozy,
    fontWeight: "bolder",
    borderRadius: theme.spacing.cozy
  },
  cardContainer: {
    display: "flex"
  },
}));

function PlayerInfo({ player, position, hidden, owner }) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const getPositionClass = (position) => {
    if (position === 'left') {
      return classes.playerInfoContainerLeft;
    } else if (position === 'right') {
      return classes.playerInfoContainerRight;
    } else if (position === 'top') {
      return classes.playerInfoContainerTop;
    } else {
      return classes.playerInfoContainer;
    }
  }

  return (
    <div className={getPositionClass(position)}>
      <div className={classes.playerInfo}>
        <div className={classes.playerInfoName}>{player.username}</div>
        <div className={classes.playerInfoMeta}>HP: {player.hp}</div>
      </div>
    </div>
  );
}

export default PlayerInfo;