import React from 'react';
import { createUseStyles } from 'react-jss';
import { getPlayer } from '../../tv/services';
import _ from 'lodash';

const useStyles = createUseStyles(theme => ({
  inboxContainer: {
    position: "absolute",
    bottom: "0vh",
    left: "0%",
    width: "20%",
    height: "30vh"
  },
  inbox: {
    position: "relative",
    width: "100%",
    height: "100%",
    fontSize: "0.75em",
    backgroundColor: "black",
  },
  messageContainer: {
    width: "100%",
    padding: "5px"
  },
  message: {
    width: "auto",
    paddingBottom: "2.5px"
  },
  username: {
    fontWeight: "bold"
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
        <div className={classes.messageContainer}>
        {messages.map(({ sender, text, target }) => {
          const { username, color } = getPlayer(players, sender);
          return (
            <div className={classes.message}>
              <span className={classes.username} style={{ color }}>{username}</span>: {getTargetText(players, text, target)}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default Inbox;