import React from 'react';
import { createUseStyles } from 'react-jss';
import { getPlayer } from '../../tv/services';
import _ from 'lodash';

const useStyles = createUseStyles(theme => ({
  inboxContainer: {
    position: "absolute",
    bottom: "9%",
    left: "0%",
    width: "20%",
    height: "26%"
  },
  inbox: {
    position: "relative",
    width: "98%",
    height: "100%",
    fontSize: "0.75em",
    overflowY: "scroll",
    backgroundColor: "black",
  },
  message: {
    backgroundColor: "black",
    margin: "5px",
  }
}));

const getTargetText = (players, text, target) => {
  const { username, color } = getPlayer(players, target);
  const split = _.split(text, ' ');
  return _.map(split, item => {
    if (_.includes(item, '%TARGET%')) {
      return <span style={{ color }}>{username} </span>;
    }
    return `${item} `;
  })
}

function Inbox({ players, messages }) {
  const classes = useStyles();

  return (
    <div className={classes.inboxContainer}>
      <div className={classes.inbox}>
        {messages.map(({ sender, text, target }) => {
          const { username, color } = getPlayer(players, sender);
          return (
            <div className={classes.message}>
              <span style={{ color }}>{username}</span>: {getTargetText(players, text, target)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Inbox;